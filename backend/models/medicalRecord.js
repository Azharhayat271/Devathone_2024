const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }, // Reference to patient collection
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }, // Reference to doctor collection
    medicalHistory: String,
    prescription: String,
    testResults: String,
    images: [{
        url: String,
        type: String,
    }],
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
