const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AppointmentSlot',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
