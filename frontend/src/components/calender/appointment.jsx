import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Card, Typography, Container, Snackbar } from '@mui/material';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from 'date-fns';
import { createSlot } from '../../API/appointment/createSlot';
import { getAllSlots } from '../../API/appointment/getAllSlots';
import Getslots from './getallslots';
import './Calender.css';

const CalendarSection = () => {
  const [slots, setSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [doctorId, setDoctorId] = useState('');
  const [newSlot, setNewSlot] = useState({ date: '', startTime: '', endTime: '', doctorId: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const storedDoctorId = localStorage.getItem('id');
    if (storedDoctorId) {
      setDoctorId(storedDoctorId);
      setNewSlot(prev => ({ ...prev, doctorId: storedDoctorId }));
    }
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const result = await getAllSlots();
        if (result.success) {
          setSlots(result.data);
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

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setNewSlot(prev => ({ ...prev, [name]: value }));
  };

  const handleSlotSubmit = async () => {
    try {
      const result = await createSlot(newSlot);
      if (result.success) {
        setSlots(prevSlots => [...prevSlots, result.data.slot]);
        setSuccessMessage('Slot added successfully!');
        setOpenSnackbar(true);
        setNewSlot({ date: '', startTime: '', endTime: '', doctorId });
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error('Error creating slot:', error);
      setErrorMessage('Error creating slot.');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const startOfMonthDate = startOfMonth(currentDate);
  const endOfMonthDate = endOfMonth(currentDate);
  const startOfWeekDate = startOfWeek(startOfMonthDate);
  const endOfWeekDate = endOfWeek(endOfMonthDate);

  const days = eachDayOfInterval({ start: startOfWeekDate, end: endOfWeekDate });
  const monthName = format(currentDate, 'MMMM yyyy');

  const isCurrentDate = (date) => isToday(date);

  const getSlotsForDay = (date) => {
    if (!Array.isArray(slots)) {
      console.error('Slots is not an array:', slots);
      return null;
    }

    return slots
      .filter(slot => slot && slot.date && format(new Date(slot.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
      .map((slot, index) => (
        <div key={index} className="fc-slot">
          <div>Doctor ID: {slot.doctorId}</div>
          <div>{slot.startTime} - {slot.endTime}</div>
        </div>
      ));
  };

  const renderDays = () => {
    const weeks = [];
    let week = [];
    for (let day of days) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length) weeks.push(week);

    return weeks.map((week, weekIndex) => (
      <tr className={`fc-week ${weekIndex === 0 ? 'fc-first' : ''}`} key={weekIndex}>
        {week.map((day) => (
          <td
            key={day}
            className={`fc-day ${format(day, 'eee').toLowerCase()} fc-widget-content ${isCurrentDate(day) ? 'fc-today' : ''}`}
            data-date={format(day, 'yyyy-MM-dd')}
          >
            <div>
              <div className="fc-day-number">{format(day, 'd')}</div>
              <div className="fc-day-content">
                {getSlotsForDay(day)}
              </div>
            </div>
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <Typography variant="h5" sx={{ p: 2 }}>Create Slot</Typography>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  name="date"
                  value={newSlot.date}
                  onChange={handleSlotChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Start Time"
                  type="time"
                  fullWidth
                  name="startTime"
                  value={newSlot.startTime}
                  onChange={handleSlotChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="End Time"
                  type="time"
                  fullWidth
                  name="endTime"
                  value={newSlot.endTime}
                  onChange={handleSlotChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleSlotSubmit} fullWidth>
                  Add Slot
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <Typography variant="h5" sx={{ p: 2 }}>Get All Slots</Typography>
            <Getslots />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Typography variant="h5" sx={{ p: 2 }}>{monthName}</Typography>
            <div id="wrap">
              <div id="calendar" className="fc fc-ltr">
                <table className="fc-header" style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td className="fc-header-left">
                        <Button onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
                          ‹
                        </Button>
                      </td>
                      <td className="fc-header-right">
                        <Button onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>
                          ›
                        </Button>
                        <Button onClick={() => setCurrentDate(new Date())}>
                          Today
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="fc-border-separate" style={{ width: '100%' }} cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Sun</th>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thu</th>
                      <th>Fri</th>
                      <th>Sat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderDays()}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
    </Container>
  );
};

export default CalendarSection;
