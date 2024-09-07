import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for back navigation
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Divider,
  Box,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Person,
  Phone,
  CalendarToday,
  Upload,
  ArrowBack,
} from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";
import { getUserByIdAPI } from "../../API/users/getUserbyID"; // Your API functions
import { editUserAPI } from "../../API/users/editUser"; // Import the editUserAPI function
import { storage, ref, uploadBytes, getDownloadURL } from "../../../firebase"; // Updated imports

const UserEdit = () => {
  const { userId } = useParams(); // Get userId from URL params
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [editingUser, setEditingUser] = useState(null); // Track edited user data
  const [file, setFile] = useState(null); // Track selected file
  const [uploading, setUploading] = useState(false); // Track upload state
  const [preview, setPreview] = useState(""); // Track image preview
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      const response = await getUserByIdAPI(userId);
      if (response.error) {
        setError(response.error);
      } else {
        setUser(response.data.user);
        setEditingUser(response.data.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (file) {
      // Create a local URL for the preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Clean up URL object when component unmounts or file changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditingUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return "";

    setUploading(true);

    // Create a reference to the storage bucket
    const storageRef = ref(storage, `profile-pictures/${file.name}`);

    try {
      // Upload the file
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imageURL = user.image; // Use existing image URL if no new image is uploaded

    if (file) {
      imageURL = await handleUpload();
    }

    const updatedUser = { ...editingUser, image: imageURL };

    try {
      const response = await editUserAPI(userId, updatedUser); // Call the editUserAPI function
      if (response.error) {
        setError(response.error);
      } else {
        setUser(response.data.user);
        setEditingUser(response.data.user);
        setFile(null); // Clear file input after successful submission
        setPreview(""); // Clear preview
      }
    } catch (error) {
      setError("An error occurred while updating the user.");
    }
  };

  const getInitials = (name) => {
    if (!name) return ""; // Handle undefined or null name
    const names = name.split(" ");
    return names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0][0];
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", p: 3, textAlign: "center" }}>
        <CircularProgress />
        <Typography
          variant="h6"
          mt={2}
        >
          Loading user data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: "100%", p: 3, textAlign: "center" }}>
        <Typography
          variant="h6"
          color="error"
        >
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ width: "100%", p: 3, textAlign: "center" }}>
        <Typography variant="h6">No user data found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        aria-label="go back"
      >
        <ArrowBack />
      </IconButton>

      <Box
        textAlign="center"
        mb={3}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: preview ? "transparent" : deepOrange[500],
            fontSize: "3rem",
            margin: "auto",
          }}
          src={preview || user.image || undefined}
        >
          {!preview && !user.image && getInitials(user.name)}
        </Avatar>
        <Typography
          variant="h5"
          mt={2}
        >
          {user.name}
        </Typography>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <IconButton component="span">
            <Upload />
          </IconButton>
        </label>
        {uploading && <Typography variant="body2">Uploading...</Typography>}
      </Box>

      <Typography
        variant="h6"
        gutterBottom
      >
        Edit User Information
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={editingUser.username || ""}
              InputProps={{
                startAdornment: <AccountCircle sx={{ mr: 1 }} />,
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={editingUser.email || ""}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1 }} />,
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={editingUser.role || ""}
              InputProps={{
                startAdornment: <Person sx={{ mr: 1 }} />,
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <FormControl
              fullWidth
              variant="outlined"
            >
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={editingUser.gender || ""}
                label="Gender"
                onChange={handleChange}
                renderValue={(value) => (
                  <Typography variant="body1">{value}</Typography>
                )}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNo"
              value={editingUser.phoneNo || ""}
              InputProps={{
                startAdornment: <Phone sx={{ mr: 1 }} />,
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              fullWidth
              label="Join Date"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : ""
              }
              InputProps={{
                startAdornment: <CalendarToday sx={{ mr: 1 }} />,
              }}
              disabled
            />
          </Grid>
        </Grid>
        <Box
          textAlign="center"
          mt={3}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserEdit;
