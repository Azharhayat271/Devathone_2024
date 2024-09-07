const mongoose = require('mongoose');

const appointmentSlotSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.AppointmentSlot || mongoose.model('AppointmentSlot', appointmentSlotSchema);
