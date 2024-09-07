const express = require("express");
const router = express.Router();
const MedicalRecord = require("../models/medicalRecord"); // Adjust the path to your model

router.post("/records", async (req, res) => {
  console.log("Received request:", req.body);
  try {
    const { medicalHistory, prescription, testResults, images } = req.body;

    // Create a new medical record and let MongoDB handle the auto-generation of IDs
    const newRecord = new MedicalRecord({
      medicalHistory,
      prescription,
      testResults,
      images,
    });

    await newRecord.save();
    res
      .status(201)
      .json({
        message: "Medical record created successfully",
        record: newRecord,
      });
  } catch (error) {
    console.error("Error creating medical record:", error.message);
    res
      .status(500)
      .json({
        error: "Failed to create medical record",
        details: error.message,
      });
  }
});

module.exports = router;
