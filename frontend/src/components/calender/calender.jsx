import React, { useState, useEffect } from "react";
import CalenderSection from "./CalenderSection";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
  });
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  const handleAddEvent = () => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setShowModal(false);
    setNewEvent({ name: "", description: "", date: "", time: "" });
  };

  const handleDeleteEvent = () => {
    if (deleteIndex !== null) {
      const updatedEvents = events.filter((_, index) => index !== deleteIndex);
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setDeleteIndex(null); // Clear the delete index
      setShowDeleteModal(false); // Close delete confirmation modal
    }
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true); // Show delete confirmation modal
  };

  return (
    <div>
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Calendar</h6>
          <ul className="d-flex align-items-center gap-2">
            <li className="fw-medium">
              <a
                href="index.html"
                className="d-flex align-items-center gap-1 hover-text-primary"
              >
                <iconify-icon
                  icon="solar:home-smile-angle-outline"
                  className="icon text-lg"
                ></iconify-icon>
                Dashboard
              </a>
            </li>
            <li>-</li>
            <li className="fw-medium">Components / Calendar</li>
          </ul>
        </div>

        <div className="row gy-4">
          <div className="col-xxl-3 col-lg-4">
            <div className="card h-100 p-0">
              <div className="card-body p-24">
                <button
                  type="button"
                  className="btn btn-primary text-sm btn-sm px-12 py-12 w-100 radius-8 d-flex align-items-center gap-2 mb-32"
                  onClick={() => setShowModal(true)}
                >
                  <iconify-icon
                    icon="fa6-regular:square-plus"
                    className="icon text-lg line-height-1"
                  ></iconify-icon>
                  Add Event
                </button>

                <div className="mt-32">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="event-item d-flex align-items-center justify-content-between gap-4 pb-16 mb-16 border border-start-0 border-end-0 border-top-0"
                    >
                      <div>
                        <div className="d-flex align-items-center gap-10">
                          <span className="w-12-px h-12-px bg-info-600 rounded-circle fw-medium"></span>
                          <span className="text-secondary-light">
                            {event.date}, {event.time}
                          </span>
                        </div>
                        <span className="text-primary-light fw-semibold text-md mt-4">
                          {event.name}
                        </span>
                        <p className="text-secondary-light mt-2">
                          {event.description}
                        </p>
                      </div>
                      <div className="dropdown">
                        <IconButton
                          className="btn btn-danger"
                          onClick={() => confirmDelete(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <CalenderSection events={events} />
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Event
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="eventName" className="form-label">
                      Event Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventName"
                      value={newEvent.name}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="eventDescription"
                      rows="3"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventDate" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="eventDate"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventTime" className="form-label">
                      Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="eventTime"
                      value={newEvent.time}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, time: e.target.value })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddEvent}
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Confirm Delete
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this event?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
