const express = require('express');
const router = express.Router();
const { createSlot, getSlots } = require('../controllers/appointment'); // Adjust the path as needed

// Route to create a slot
router.post('/slots', createSlot);

// Route to get all slots
router.get('/slots', getSlots);

module.exports = router;
