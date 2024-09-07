import React, { useEffect, useState } from "react";
import Logo from "./../assets/images/logo1.png";
import { Link, useLocation } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"; // Icon for All Patients
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; // Icon for All Doctors
import DynamicFormIcon from "@mui/icons-material/DynamicForm"; // Icon for Users forms
import ErrorIcon from "@mui/icons-material/Error"; // Icon for Validation forms
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // Icon for Calendar
import SettingsIcon from "@mui/icons-material/Settings"; // Icon for Profile Settings
import LogoutIcon from "@mui/icons-material/Logout"; // Icon for Logout
import DashboardIcon from "@mui/icons-material/Dashboard"; // Icon for Dashboard
import Typography from "@mui/material/Typography"; // Material UI Typography for text
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BookIcon from '@mui/icons-material/Book';

const Sidebar = ({ isMobileActive }) => {
  const [mobileActive, setMobileActive] = useState(false);
  const [userRole, setUserRole] = useState("user"); // Default role
  const location = useLocation();

  useEffect(() => {
    setMobileActive(isMobileActive);
  }, [isMobileActive]);

  useEffect(() => {
    // Retrieve role from local storage
    const role = localStorage.getItem("role") || "user"; // Default to 'user' if not found
    setUserRole(role);
  }, []);

  const handleClick = () => {
    setMobileActive(!mobileActive);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Optional: remove role on logout
    window.location.href = "/";
  };

  const menuItems = {
    admin: [
      { to: "/newDashboardDesign", icon: <DashboardIcon className="me-3" />, text: "Dashboard" },
      { to: "/table", icon: <PeopleAltIcon className="me-3" />, text: "All Patients" },
      { to: "/dcotors", icon: <LocalHospitalIcon className="me-3" />, text: "All Doctors" },
      { to: "/formLayout", icon: <DynamicFormIcon className="me-3" />, text: "Users forms" },
      { to: "/formValidations", icon: <ErrorIcon className="me-3" />, text: "Validation forms" },
      { to: "/calender", icon: <CalendarMonthIcon className="me-3" />, text: "Calendar" },
    ],
    user: [
      { to: "/welcomeuser", icon: <DashboardIcon className="me-3" />, text: "Dashboard" },
      { to: "/calender", icon: <CalendarMonthIcon className="me-3" />, text: "Activities" },
      { to: "/dcotors", icon: <LocalHospitalIcon className="me-3" />, text: "All Doctors" },
      { to: "/booking", icon: <BookIcon className="me-3" />, text: "Appointments" },
      { to: "/viewProfile", icon: <SettingsIcon className="me-3" />, text: "Profile Setting" },
    ],
    doctor: [
      { to: "/welcomeuser", icon: <DashboardIcon className="me-3" />, text: "Dashboard" },
      { to: "/appointment", icon: <AssignmentIcon className="me-3" />, text: "Slots" },
      { to: "/bookings", icon: <LocalPhoneIcon className="me-3" />, text: "Bookings" },
      { to: "/calender", icon: <CalendarMonthIcon className="me-3" />, text: "Activities" },
      { to: "/viewProfile", icon: <SettingsIcon className="me-3" />, text: "Profile Setting" },

    ]
  };

  return (
    <div>
      <aside className={`sidebar ${mobileActive ? "sidebar-open" : ""}`}>
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={handleClick}
        >
          <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          <a
            className="sidebar-logo"
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "20px",
              border: "none",
              boxShadow: "none",
            }}
          >
            <img
              src={Logo}
              alt="site logo"
              className="light-logo"
              style={{ marginRight: "10px" }}
            />
            <Typography
              variant="h6"
              style={{ color: "#4D6E72", fontWeight: "bold" }}
            >
              Health Portal
            </Typography>
          </a>
        </div>
        <div className="sidebar-menu-area open">
          <ul
            className="sidebar-menu show"
            id="sidebar-menu"
          >
            {menuItems[userRole]?.map((item, index) => (
              <li key={index} className={location.pathname === item.to ? 'active' : ''}>
                <Link to={item.to}>
                  <a>
                    {item.icon}
                    <span>{item.text}</span>
                  </a>
                </Link>
              </li>
            ))}
            <li className="sidebar-menu-group-title">Settings</li>
            <li>
              <a onClick={handleClickLogout}>
                <LogoutIcon className="me-3" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
