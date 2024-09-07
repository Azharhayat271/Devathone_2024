const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  isbooked: {
    type: Boolean,
    default: false
  }
  // Additional fields if needed
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
