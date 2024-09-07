const express = require('express');
const router = express.Router();
const { createSlot, getSlots, bookSlot } = require('../controllers/appointment'); // Adjust the path as needed

// Route to create a slot
router.post('/slots', createSlot);

// Route to get all slots
router.get('/slots', getSlots);

// Route to book a slot
router.patch('/slots/book-slot/:slotId', bookSlot);

module.exports = router;
