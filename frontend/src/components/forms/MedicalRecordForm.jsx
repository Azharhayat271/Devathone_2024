import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box, Divider, CircularProgress } from '@mui/material';
import { UploadFile as UploadFileIcon } from '@mui/icons-material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';  // Import Firebase storage
import axios from 'axios'; // Assuming you'll use Axios to send data to the backend

const MedicalRecordForm = () => {
    const [formData, setFormData] = useState({
        medicalHistory: '',
        prescription: '',
        testResults: '',
        images: [],
        imageType: '',
    });
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            // Step 1: Upload images to Firebase
            const uploadedImageURLs = await Promise.all(
                formData.images.map(async (image) => {
                    const storageRef = ref(storage, `medical-records/${image.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, image);

                    // Wait for upload completion and get download URL
                    await uploadTask;
                    return await getDownloadURL(storageRef);
                })
            );

            // Step 2: Prepare the form data for submission
            const finalFormData = {
                medicalHistory: formData.medicalHistory,
                prescription: formData.prescription,
                testResults: formData.testResults,
                images: uploadedImageURLs.map((url) => ({
                    url,
                    type: formData.imageType,
                })),
            };

            // Step 3: Send the form data to your backend
            await axios.post('http://localhost:5000/api/medicalrecords/records', finalFormData);

            // Clear form after successful submission
            setFormData({
                medicalHistory: '',
                prescription: '',
                testResults: '',
                images: [],
                imageType: '',
            });

            alert('Medical record successfully uploaded!');
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Error uploading medical record.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box p={3} sx={{ width: '100%' }}>
            <Typography variant="h5" gutterBottom>
                Medical Record Management
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Medical History"
                            name="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Prescription"
                            name="prescription"
                            value={formData.prescription}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Test Results"
                            name="testResults"
                            value={formData.testResults}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Image Type</InputLabel>
                            <Select
                                name="imageType"
                                value={formData.imageType}
                                onChange={handleInputChange}
                                label="Image Type"
                            >
                                <MenuItem value="X-ray">X-ray</MenuItem>
                                <MenuItem value="MRI">MRI</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<UploadFileIcon />}
                        >
                            Upload Medical Images
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </Button>
                    </Grid>

                    {uploading && (
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress />
                                <Typography variant="body1" mt={2}>Uploading images...</Typography>
                            </Box>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={uploading}
                        >
                            Submit Medical Record
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default MedicalRecordForm;
