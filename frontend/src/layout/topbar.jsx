import React, { useState } from 'react';
import User from "./../assets/images/user-grid/user.png";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./../assets/icon/notification.png";
import Mail from "./../assets/icon/mail.png";

const Topbar = ({ toggleActive, toggleMobileActive }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const imageUrl = localStorage.getItem("image");


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/viewProfile"); // Adjust the route as needed
  };

  return (
    <div>
      <div className="navbar-header">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <div className="d-flex flex-wrap align-items-center gap-4">
              <button
                type="button"
                className="sidebar-mobile-toggle"
                onClick={toggleMobileActive}
              >
                <MenuIcon className="icon text-2xl non-active" />
              </button>
              <form className="navbar-search">
                <input type="text" name="search" placeholder="Search" />
                <SearchIcon className="icon" />
              </form>
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div className="dropdown">
                <button
                  className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                  type="button"
                  id="mailDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={Mail}
                    className="text-primary-light text-xl"
                    style={{ width: "60%" }}
                    alt="Mail"
                  />
                </button>
                <ul className="dropdown-menu" aria-labelledby="mailDropdown">
                  {/* Mail dropdown content (if any) */}
                </ul>
              </div>

              <div className="dropdown">
                <button
                  className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                  type="button"
                  id="notificationDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={Notification}
                    className="text-primary-light text-xl"
                    style={{ width: "70%" }}
                    alt="Notification"
                  />
                </button>
                <ul className="dropdown-menu" aria-labelledby="notificationDropdown">
                  {/* Notification dropdown content (if any) */}
                </ul>
              </div>

              <div className="dropdown">
                <button
                  className="d-flex justify-content-center align-items-center rounded-circle"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={imageUrl || User}
                    alt="Profile"
                    className="w-40-px h-40-px object-fit-cover rounded-circle"
                  />
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={handleProfileClick}
                    >
                      <PersonIcon className="me-2" /> Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#logoutModal"
                    >
                      <PowerSettingsNewIcon className="me-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">Confirm Logout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to logout?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
