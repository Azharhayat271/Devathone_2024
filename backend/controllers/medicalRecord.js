const MedicalRecord = require('../models/medicalRecord');

// Create medical record
const createMedicalRecord = async (req, res) => {
  try {
    const { patientId, doctorId, medicalHistory, prescription, testResults, images } = req.body;

    const newRecord = new MedicalRecord({
      patientId,
      doctorId,
      medicalHistory,
      prescription,
      testResults,
      images, // The Firebase URL for the image is handled in the frontend
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error creating medical record' });
  }
};

module.exports = {
  createMedicalRecord,
};
