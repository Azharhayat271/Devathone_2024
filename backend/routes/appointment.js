const express = require("express");
const router = express.Router();
const {
  createSlot,
  getDoctorSlots,
  bookAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  cancelAppointment,
} = require("../controllers/appointment");

// Middleware to protect routes (assuming user authentication middleware is set up)

// Create slot (protected route)
router.post("/slots", createSlot);

// Get all slots for a doctor (protected route)
router.get("/slots", getDoctorSlots);

// Book an appointment (protected route)
router.post("/appointments/book", bookAppointment);

// Get all appointments for a doctor (protected route)
router.get("/appointments/doctor", getDoctorAppointments);

// Get all appointments for a patient (protected route)
router.get("/appointments/patient", getPatientAppointments);

// Cancel an appointment (protected route)
router.post("/appointments/cancel", cancelAppointment);

module.exports = router;
