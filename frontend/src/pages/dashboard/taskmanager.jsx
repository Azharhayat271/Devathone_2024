import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { IconButton } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { FaCalendarAlt, FaClock, FaRegListAlt } from 'react-icons/fa'; // Import relevant icons

const TaskManager = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    // Fetch events from local storage
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleViewMore = () => {
    navigate("/calender"); // Navigate to calendar route
  };

  return (
    <div className="card radius-8 border-0" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-2 fw-bold text-lg">Upcoming Events</h6>
          <IconButton
            color="primary"
            onClick={handleViewMore}
            aria-label="view more"
          >
            <ArrowForward />
          </IconButton>
        </div>
      </div>

      <div className="card-body p-24" style={{ flex: '1 1 auto', overflowY: 'auto' }}>
        <div>
          {events.length === 0 ? (
            <div className="text-center text-secondary-light">
              No upcoming events
            </div>
          ) : (
            events.map((event, index) => (
              <div
                className="d-flex align-items-start gap-3 mb-3 pb-2"
                key={index}
                style={{ borderBottom: '1px solid #dee2e6' }} // Optional: Add a bottom border for separation
              >
                <div className="d-flex align-items-center me-3">
                  <FaRegListAlt style={{ fontSize: '24px', color: '#007bff' }} /> {/* Colorful event icon */}
                </div>
                <div className="flex-grow-1">
                  <h6 className="text-sm mb-1">{event.name}</h6>
                  <div className="d-flex align-items-center gap-2">
                    <FaCalendarAlt style={{ fontSize: '20px', color: '#28a745' }} /> {/* Colorful date icon */}
                    <span className="text-xs text-secondary-light fw-medium">
                      {event.date}
                    </span>
                    <FaClock style={{ fontSize: '20px', color: '#ffc107' }} /> {/* Colorful time icon */}
                    <span className="text-xs text-secondary-light fw-medium ms-1">
                      {event.time} {/* Display the time of the event */}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
