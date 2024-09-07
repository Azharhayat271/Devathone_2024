import React, { useEffect, useState } from 'react';
import { getAllSlots } from '../../API/appointment/getAllSlots';
import { getUserByIdAPI } from '../../API/users/getUserbyID';
import { CircularProgress, Typography, Card, CardContent, Grid, Container, Alert, Button } from '@mui/material';
import axios from '../../utils/axios/axiosInstance'; // Import axios for making API requests

// Function to book a slot
const bookSlotAPI = async (slotId) => {
  let resolved = {
    error: null,
    data: null,
  };

  try {
    const response = await axios({
      url: `/api/appointments/book-slot/${slotId}`,
      method: 'PATCH',
      data: { isBooked: true },
    });
    resolved.data = response.data;
  } catch (err) {
    if (err && err.response && err.response.data && err.response.data.message) {
      resolved.error = err.response.data.message;
    } 
  }

  return resolved;
};

const SlotsList = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState({});
  const [bookingError, setBookingError] = useState(null); // State to track booking errors

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      const { data, error } = await getAllSlots();

      if (error) {
        setError(error);
      } else {
        const slotsData = data.data;
        setSlots(slotsData);

        // Fetch doctor names
        const doctorPromises = slotsData.map(slot => getUserByIdAPI(slot.doctorId));
        const doctorResponses = await Promise.all(doctorPromises);

        // Ensure doctor data is correctly structured
        const doctorData = doctorResponses.reduce((acc, { data, error }, index) => {
          if (!error && data && data.user) {
            acc[slotsData[index].doctorId] = data.user.name;
          }
          return acc;
        }, {});

        setDoctors(doctorData);
      }
      setLoading(false);
    };

    fetchSlots();
  }, []);

  const handleBooking = async (slotId) => {
    const { data, error } = await bookSlotAPI(slotId);

    if (error) {
      setBookingError(error);
    } else {
      // Update local state to reflect booking status
      setSlots(slots.map(slot => slot._id === slotId ? { ...slot, isBooked: true } : slot));
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="false"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          position: 'absolute',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth="false"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          position: 'absolute',
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Available Slots
      </Typography>
      {bookingError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {bookingError}
        </Alert>
      )}
      <Grid container spacing={2}>
        {slots.length > 0 ? (
          slots.map((slot) => (
            <Grid item xs={12} sm={6} md={4} key={slot._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">
                    Date: {new Date(slot.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time: {slot.startTime} - {slot.endTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Doctor: {doctors[slot.doctorId] || 'Fetching...'}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBooking(slot._id)}
                    sx={{ mt: 2 }}
                    disabled={slot.isBooked}
                  >
                    {slot.isBooked ? 'Booked' : 'Book Slot'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No slots available</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default SlotsList;
