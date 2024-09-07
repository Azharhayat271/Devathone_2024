const Appointment = require('../models/appointment');
const AppointmentSlot = require('../models/appointmentSlot');

// Create a Slot
exports.createSlot = async (req, res) => {
  const { date, startTime, endTime } = req.body;
  const doctorId = req.user.id; // Assuming user authentication middleware is setting req.user

  try {
    const slot = new AppointmentSlot({
      doctor: doctorId,
      date,
      startTime,
      endTime,
    });

    await slot.save();
    res.status(201).json({
      success: true,
      message: 'Appointment slot created successfully.',
      slot,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Slots for a Doctor
exports.getDoctorSlots = async (req, res) => {
  const doctorId = req.user.id; // Assuming user authentication middleware is setting req.user

  try {
    const slots = await AppointmentSlot.find({ doctor: doctorId }).exec();
    res.status(200).json({ success: true, slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Book an Appointment
exports.bookAppointment = async (req, res) => {
  const { slotId } = req.body;
  const patientId = req.user.id; // Assuming user authentication middleware is setting req.user

  try {
    const slot = await AppointmentSlot.findById(slotId).exec();

    if (!slot || !slot.isAvailable) {
      return res.status(400).json({ success: false, message: 'Slot not available' });
    }

    const appointment = new Appointment({
      patient: patientId,
      doctor: slot.doctor,
      slot: slotId,
      appointmentDate: slot.date,
    });

    slot.isAvailable = false;
    await slot.save();
    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully.',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Appointments for a Doctor
exports.getDoctorAppointments = async (req, res) => {
  const doctorId = req.user.id; // Assuming user authentication middleware is setting req.user

  try {
    const appointments = await Appointment.find({ doctor: doctorId }).populate('patient').exec();
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Appointments for a Patient
exports.getPatientAppointments = async (req, res) => {
  const patientId = req.user.id; // Assuming user authentication middleware is setting req.user

  try {
    const appointments = await Appointment.find({ patient: patientId }).populate('doctor').exec();
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel an Appointment
exports.cancelAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  const patientId = req.user.id; // Assuming user authentication middleware is setting req.user

  try {
    const appointment = await Appointment.findOne({ _id: appointmentId, patient: patientId }).exec();

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found or not booked by you' });
    }

    const slot = await AppointmentSlot.findById(appointment.slot).exec();
    if (slot) {
      slot.isAvailable = true;
      await slot.save();
    }

    await appointment.remove();

    res.status(200).json({ success: true, message: 'Appointment canceled successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
