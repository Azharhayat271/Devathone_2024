import React, { useEffect, useState } from "react";
import Logo from "./../assets/images/logo1.png";
import LogoIcon from "./../assets/images/logo-icon.png";
import { Link } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"; // Icon for All Patients
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; // Icon for All Doctors
import DynamicFormIcon from "@mui/icons-material/DynamicForm"; // Icon for Users forms
import ErrorIcon from "@mui/icons-material/Error"; // Icon for Validation forms
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // Icon for Calendar
import SettingsIcon from "@mui/icons-material/Settings"; // Icon for Profile Settings
import LogoutIcon from "@mui/icons-material/Logout"; // Icon for Logout
import DashboardIcon from "@mui/icons-material/Dashboard"; // Icon for Dashboard

const Sidebar = ({ isMobileActive }) => {
  const [mobileActive, setMobileActive] = useState(false);

  useEffect(() => {
    setMobileActive(isMobileActive);
  }, [isMobileActive]);

  // Handle click function
  const handleClick = () => {
    setMobileActive(!mobileActive);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <aside className={`sidebar  ${mobileActive ? "sidebar-open" : ""}`}>
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={handleClick}
        >
          <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
        </button>
        <div>
          <a className="sidebar-logo">
            <img
              src={Logo}
              alt="site logo"
              className="light-logo"
            />
            <img
              src={Logo}
              alt="site logo"
              className="dark-logo"
            />
            <img
              src={LogoIcon}
              alt="site logo"
              className="logo-icon"
            />
          </a>
        </div>
        <div className="sidebar-menu-area open">
          <ul
            className="sidebar-menu show"
            id="sidebar-menu"
          >
            <li>
              <Link to="/newDashboardDesign">
                <a>
                  <DashboardIcon className="me-3" />
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>

            <li className="sidebar-menu-group-title">User</li>
            <Link to="/table">
              <li>
                <a>
                  <PeopleAltIcon className="me-3"></PeopleAltIcon>
                  <span>All Patients</span>
                </a>
              </li>
            </Link>
            <Link to="/grid">
              <li>
                <a>
                  <LocalHospitalIcon className="me-3"></LocalHospitalIcon>
                  <span>All Doctors</span>
                </a>
              </li>
            </Link>
            <Link to="/formLayout">
              <li>
                <a>
                  <DynamicFormIcon className="me-3"></DynamicFormIcon>
                  <span>Users forms</span>
                </a>
              </li>
            </Link>
            <Link to="/formValidations">
              <li>
                <a>
                  <ErrorIcon className="me-3"></ErrorIcon>
                  <span>Validation forms</span>
                </a>
              </li>
            </Link>
            <Link to="/calender">
              <li>
                <a>
                  <CalendarMonthIcon className="me-3"></CalendarMonthIcon>
                  <span>Calendar</span>
                </a>
              </li>
            </Link>

            <li className="sidebar-menu-group-title">Settings</li>
            <Link to="/viewProfile">
              <li>
                <a>
                  <SettingsIcon className="me-3"></SettingsIcon>
                  <span>Profile Setting</span>
                </a>
              </li>
            </Link>

            <Link>
              <li>
                <a onClick={handleClickLogout}>
                  <LogoutIcon className="me-3"></LogoutIcon>
                  <span>Logout</span>
                </a>
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
