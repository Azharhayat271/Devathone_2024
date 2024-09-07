const Slot = require('../models/appointment'); // Adjust the path as needed

// Controller function to create a new slot
const createSlot = async (req, res) => {
  try {
    const { doctorId, date, startTime, endTime } = req.body;

    // Create a new slot instance
    const newSlot = new Slot({
      doctorId,
      date,
      startTime,
      endTime,
    });

    // Save the slot to the database
    const savedSlot = await newSlot.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: 'Slot created successfully',
      data: savedSlot,
    });
  } catch (error) {
    console.error('Error creating slot:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create slot',
    });
  }
};

// Controller function to get all slots
const getSlots = async (req, res) => {
  try {
    // Retrieve all slots from the database
    const slots = await Slot.find();

    // Send a success response with the slots data
    res.status(200).json({
      success: true,
      data: slots,
    });
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch slots',
    });
  }
};

module.exports = {
  createSlot,
  getSlots,
};

