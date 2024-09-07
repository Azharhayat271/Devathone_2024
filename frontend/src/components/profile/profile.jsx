import React, { useEffect, useState } from "react";
import User from "./../../assets/images/user-grid/user.png";
import Image1 from "./../../assets/images/user-grid/bg.png";
import { getUserByIdAPI } from "./../../API/users/getUserbyID";
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('id'); // Directly get the user ID from local storage

    if (userId) {
      // Fetch user data from the API
      getUserByIdAPI(userId)
        .then(response => {
          if (response.error == null) {
            setUserData(response.data.user);
          } else {
            setError("Failed to fetch user data");
          }
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    } else {
      setError("No user ID found in localStorage");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Box sx={{ padding: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
          <Skeleton variant="circular" width={100} height={100} />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Skeleton width="30%" />
          <Skeleton width="50%" />
          <Skeleton width="40%" />
          <Skeleton width="60%" />
          <Skeleton width="50%" />
          <Skeleton width="50%" />
        </Box>
      </Box>
    );
  }
  
  if (error) return <p>Error: {error.message}</p>;
  if (!userData) return <p>No user data found</p>;

  return (
    <>
      <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
        <img src={Image1} alt="" className="w-100 object-fit-cover" />
        <div className="pb-24 ms-16 mb-24 me-16 mt--100">
          <div className="text-center border border-top-0 border-start-0 border-end-0">
            <img
              src={userData.image || User} // Use user image from API or fallback to default
              alt="User Profile"
              className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
            />
            <h6 className="mb-0 mt-16">{userData.name}</h6>
            <span className="text-secondary-light mb-16">{userData.email}</span>
          </div>
          <div className="mt-24">
            <h6 className="text-xl mb-16">Personal Info</h6>
            <ul>
              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 text-md fw-semibold text-primary-light">Full Name</span>
                <span className="w-70 text-secondary-light fw-medium">: {userData.name}</span>
              </li>
              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 text-md fw-semibold text-primary-light">Email</span>
                <span className="w-70 text-secondary-light fw-medium">: {userData.email}</span>
              </li>
              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 text-md fw-semibold text-primary-light">Username</span>
                <span className="w-70 text-secondary-light fw-medium">: {userData.username}</span>
              </li>
              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 text-md fw-semibold text-primary-light">Phone Number</span>
                <span className="w-70 text-secondary-light fw-medium">: {userData.phoneNo}</span>
              </li>
              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 text-md fw-semibold text-primary-light">Gender</span>
                <span className="w-70 text-secondary-light fw-medium">: {userData.gender}</span>
              </li>
              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 text-md fw-semibold text-primary-light">Role</span>
                <span className="w-70 text-secondary-light fw-medium">: {userData.role}</span>
              </li>
              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 text-md fw-semibold text-primary-light">Status</span>
                <span className="w-70 text-secondary-light fw-medium">: {userData.status}</span>
              </li>
       
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
