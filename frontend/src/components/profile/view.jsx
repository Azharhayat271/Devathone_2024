import React, { useEffect, useState } from "react";
import Profile from "./profile"; // Ensure this path is correct
import ChangePassword from "./changePassword"
import { getUserByIdAPI } from "./../../API/users/getUserbyID";
import { editUserAPI } from "./../../API/users/editUser";
import { storage, ref, uploadBytes, getDownloadURL } from "../../../firebase"; // Adjust path as needed
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  InputAdornment,
  Skeleton,
  IconButton,
  Avatar,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";

const ViewProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    username: "",
    gender: "",
    role: "",
    status: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const userId = localStorage.getItem("id"); // Directly get the user ID from local storage

    if (userId) {
      getUserByIdAPI(userId)
        .then((response) => {
          if (response.error == null) {
            setUserData(response.data.user);
            setFormData({
              name: response.data.user.name,
              email: response.data.user.email,
              phoneNo: response.data.user.phoneNo,
              username: response.data.user.username || "",
              gender: response.data.user.gender || "",
              role: response.data.user.role || "",
              status: response.data.user.status || "",
            });
            setPreview(response.data.user.image || ""); // Set initial preview
          } else {
            setError("Failed to fetch user data");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError("No user ID found in localStorage");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return "";

    setUploading(true);
    const storageRef = ref(storage, `profile-pictures/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef);
      return fileURL;
    } catch (error) {
      setError("Failed to upload image.");
      return "";
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    let imageURL = preview; // Use the preview URL or existing image URL if no new image is uploaded
    if (file) {
      imageURL = await handleUpload();
    }

    const updatedData = { ...formData, image: imageURL };
    try {
      const response = await editUserAPI(userData._id, updatedData);
      if (response.error == null) {
        setUserData(response.data.user);
        setFormData(updatedData);
        setFile(null); // Clear file input after successful submission
        setPreview(imageURL); // Update preview with new image URL
        setSnackbarMessage("Profile updated successfully!");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Failed to update user data");
        setSnackbarSeverity("error");
      }
    } catch (err) {
      setSnackbarMessage(err.message);
      setSnackbarSeverity("error");
    } finally {
      setIsSubmitting(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
      </Box>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">View Profile</h6>
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
            <li className="fw-medium">View Profile</li>
          </ul>
        </div>

        <div className="row gy-4">
          <div className="col-lg-4">
            <Profile />
          </div>
          <div className="col-lg-8">
            <div className="card h-100">
              <div className="card-body p-24">
                <ul
                  className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center px-24 active"
                      id="pills-edit-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-edit-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-edit-profile"
                      aria-selected="true"
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center px-24"
                      id="pills-change-passwork-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-change-passwork"
                      type="button"
                      role="tab"
                      aria-controls="pills-change-passwork"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      Change Password
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center px-24"
                      id="pills-notification-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-notification"
                      type="button"
                      role="tab"
                      aria-controls="pills-notification"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      Notification Settings
                    </button>
                  </li>
                </ul>

                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-edit-profile"
                    role="tabpanel"
                    aria-labelledby="pills-edit-profile-tab"
                    tabIndex="0"
                  >
                    <h6 className="text-md text-primary-light mb-16">
                      Profile Image
                    </h6>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <Avatar
                        src={preview || undefined}
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: "50%",
                          bgcolor: preview ? "transparent" : deepOrange[500],
                        }}
                      >
                        {!preview && formData.name
                          ? formData.name.charAt(0)
                          : ""}
                      </Avatar>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-upload">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          style={{ marginLeft: "10px" }}
                        >
                          <UploadIcon />
                        </IconButton>
                      </label>
                      {uploading && (
                        <CircularProgress
                          size={24}
                          style={{ marginLeft: "10px" }}
                        />
                      )}
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-20">
                            <TextField
                              id="name"
                              label="Full Name"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={formData.name}
                              onChange={handleInputChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-20">
                            <TextField
                              id="username"
                              label="Username"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={formData.username}
                              onChange={handleInputChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-20">
                            <TextField
                              id="email"
                              label="Email"
                              type="email"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={formData.email}
                              onChange={handleInputChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon />
                                  </InputAdornment>
                                ),
                              }}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-20">
                            <TextField
                              id="phoneNo"
                              label="Phone"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={formData.phoneNo}
                              onChange={handleInputChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PhoneIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-20">
                            <TextField
                              id="gender"
                              label="Gender"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={formData.gender}
                              onChange={handleInputChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-20">
                            <TextField
                              id="role"
                              label="Role"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={formData.role}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon />
                                  </InputAdornment>
                                ),
                              }}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-20">
                            <TextField
                              id="status"
                              label="Status"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={formData.status}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon />
                                  </InputAdornment>
                                ),
                              }}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <Button
                          type="button"
                          variant="outlined"
                          color="error"
                          className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <CircularProgress size={24} />
                          ) : (
                            "Save"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="pills-change-passwork"
                    role="tabpanel"
                    aria-labelledby="pills-change-passwork-tab"
                    tabindex="0"
                  >
                   <ChangePassword/>
                  </div>

                  {/* The rest of the tabs (Change Password and Notification Settings) remain unchanged */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewProfile;
