import React, { useEffect, useState } from "react";
import Logo from "./../assets/images/logo.png";
import LogoIcon from "./../assets/images/logo-icon.png";
import { Link } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import ErrorIcon from "@mui/icons-material/Error";
import LoginIcon from "@mui/icons-material/Login";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

const sidebar = ({ isMobileActive }) => {
  const [mobileActive, setMobileActive] = useState(false);

  useEffect(() => {
    setMobileActive(isMobileActive);
  }, [isMobileActive]);

  //handle click functon
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
        <button type="button" class="sidebar-close-btn" onClick={handleClick}>
          <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
        </button>
        <div>
          <a class="sidebar-logo">
            <img src={Logo} alt="site logo" class="light-logo" />
            <img src={Logo} alt="site logo" class="dark-logo" />
            <img src={LogoIcon} alt="site logo" class="logo-icon" />
          </a>
        </div>
        <div class="sidebar-menu-area open">
          <ul class="sidebar-menu show" id="sidebar-menu">
            <li>
              <Link to="/newDashboardDesign">
                <a>
                  <DashboardCustomizeIcon className="me-3" />
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>

            <li class="sidebar-menu-group-title">User</li>
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
                  <PeopleOutlineIcon className="me-3"></PeopleOutlineIcon>

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
                  <span>Calender</span>
                </a>
              </li>
            </Link>

            {/* <li>
                            <a href="chat-message.html">
                                <iconify-icon icon="bi:chat-dots" class="menu-icon"></iconify-icon>
                                <span>Chat</span>
                            </a>
                        </li> */}



            <li class="sidebar-menu-group-title">Settings</li>
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
                  <SettingsIcon className="me-3"></SettingsIcon>
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

export default sidebar;
