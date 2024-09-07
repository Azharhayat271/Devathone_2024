import React, { useEffect, useState } from "react";
import { getUserStats } from "./../../API/users/userStats"; // Ensure this path is correct
import { Skeleton, Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const Cards = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [createdUsers, setCreatedUsers] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);
  const [approvedUsers, setApprovedUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      setLoading(true);
      try {
        const { data, error } = await getUserStats();
        if (error) throw new Error(error); // Improved error handling
        setTotalUsers(data.data.totalUsers ?? 0);
        setCreatedUsers(data.data.createdUsers ?? 0);
        setBlockedUsers(data.data.blockedUsers ?? 0);
        setApprovedUsers(data.data.approvedUsers ?? 0);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  if (loading) {
    return (
      <div>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ width: 300 }}>
              <Skeleton variant="rectangular" width="100%" height={100} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </Box>
          ))}
        </Box>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Dashboard Widget Start */}
      <div className="col-xxl-3 col-sm-6">
        <div className="card px-24 py-16 shadow-none radius-8 border h-100 bg-gradient-start-3">
          <div className="card-body p-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
              <div className="d-flex align-items-center">
                <div className="w-64-px h-64-px radius-16 bg-base-50 d-flex justify-content-center align-items-center me-20">
                  <span className="mb-0 w-40-px h-40-px bg-primary-600 flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-8 h6 mb-0">
                    <Icon icon="flowbite:users-group-solid" className="icon" />
                  </span>
                </div>
                <div>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  {/* <Typography variant="h6">{totalUsers}</Typography> */}
                  <Typography variant="body2" color="textSecondary">
                    Total{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                    {totalUsers}
                    </span>{" "}
                    users of Platform
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard Widget End */}

      {/* Dashboard Widget Start */}
      <div className="col-xxl-3 col-sm-6">
        <div className="card px-24 py-16 shadow-none radius-8 border h-100 bg-gradient-start-2">
          <div className="card-body p-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
              <div className="d-flex align-items-center">
                <div className="w-64-px h-64-px radius-16 bg-base-50 d-flex justify-content-center align-items-center me-20">
                  <span className="mb-0 w-40-px h-40-px bg-purple flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-8 h6 mb-0">
                    <Icon icon="solar:wallet-bold" className="text-white text-2xl mb-0" />
                  </span>
                </div>
                <div>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Created
                  </Typography>
                  {/* <Typography variant="h6">{createdUsers}</Typography> */}
                  <Typography variant="body2" color="textSecondary">
                    Total{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                    {createdUsers}
                    </span>{" "}
                    create a Account 
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard Widget End */}

      {/* Dashboard Widget Start */}
      <div className="col-xxl-3 col-sm-6">
        <div className="card px-24 py-16 shadow-none radius-8 border h-100 bg-gradient-start-5">
          <div className="card-body p-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
              <div className="d-flex align-items-center">
                <div className="w-64-px h-64-px radius-16 bg-base-50 d-flex justify-content-center align-items-center me-20">
                  <span className="mb-0 w-40-px h-40-px bg-red flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-8 h6 mb-0">
                    <Icon icon="fa6-solid:file-invoice-dollar" className="text-white text-2xl mb-0" />
                  </span>
                </div>
                <div>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Blocked
                  </Typography>
                  {/* <Typography variant="h6">{blockedUsers}</Typography> */}
                  <Typography variant="body2" color="textSecondary">
                    Total{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                    {blockedUsers}
                    </span>{" "}
                   users are blocked
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard Widget End */}

      {/* Dashboard Widget Start */}
      <div className="col-xxl-3 col-sm-6">
        <div className="card px-24 py-16 shadow-none radius-8 border h-100 bg-gradient-start-4">
          <div className="card-body p-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
              <div className="d-flex align-items-center">
                <div className="w-64-px h-64-px radius-16 bg-base-50 d-flex justify-content-center align-items-center me-20">
                  <span className="mb-0 w-40-px h-40-px bg-success-main flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-8 h6 mb-0">
                    <Icon icon="streamline:bag-dollar-solid" className="icon" />
                  </span>
                </div>
                <div>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Approved
                  </Typography>
                  {/* <Typography variant="h6">{approvedUsers}</Typography> */}
                  <Typography variant="body2" color="textSecondary">
                    Total{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                    {approvedUsers}
                    </span>{" "}
                   users are verified
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard Widget End */}
    </>
  );
};

export default Cards;
