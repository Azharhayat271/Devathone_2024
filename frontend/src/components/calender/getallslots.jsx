import React, { useState, useEffect } from 'react';
import { Container, Card, Typography, Grid, Snackbar } from '@mui/material';
import { format } from 'date-fns';
import { getAllSlots } from '../../API/appointment/getAllSlots';

const CalendarSection = () => {
  const [slots, setSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const result = await getAllSlots();
        if (result.error === null) {
          setSlots(result.data.data);
        } else {
          setErrorMessage('Error fetching slots.');
        }
      } catch (error) {
        console.error('Error fetching slots:', error);
        setErrorMessage('Error fetching slots.');
      }
    };

    fetchSlots();
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <Typography variant="h5" sx={{ p: 2 }}>All Slots</Typography>
            <Grid container spacing={2} sx={{ p: 2 }}>
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <Grid item xs={12} md={6} key={slot._id}>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="body1">
                        <strong>Date:</strong> {format(new Date(slot.date), 'MMMM d, yyyy')}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Start Time:</strong> {slot.startTime}
                      </Typography>
                      <Typography variant="body1">
                        <strong>End Time:</strong> {slot.endTime}
                      </Typography>
                   
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" sx={{ p: 2 }}>No slots available.</Typography>
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Container>
  );
};

export default CalendarSection;
