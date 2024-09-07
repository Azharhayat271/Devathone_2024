import React, { useState } from "react";
import Img1 from "./../../assets/images/auth/auth/auth-img.png";
import Img2 from "./../../assets/images/logo1.png";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { auth, googleProvider, signInWithPopup } from "../../../firebase";
import { LoginGoogleAPI } from "./../../API/auth/LoginwithGoogle";
import { LoginAPI } from "./../../API/auth/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your API login call
      debugger;
      const response = await LoginAPI({ email, password });
      if (response.error) {
        setError(response.error);
        setOpenSnackbar(true);
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user._id);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("image", response.data.user.image);
        navigate("/newDashboardDesign");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      debugger;
      // Call LoginGoogleAPI here
      const response = await LoginGoogleAPI({ email: user.email });

      if (response.error == null) {
        // Save necessary information to local storage
        localStorage.setItem("token", user.accessToken); // Adjust as needed
        localStorage.setItem("name", user.displayName);
        localStorage.setItem("id", response.data.user._id);

        localStorage.setItem("email", user.email);
        localStorage.setItem("image", user.photoURL);
        navigate("/newDashboardDesign");
      } else {
        setError(response.message || "Failed to sign in with Google.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setError("Failed to sign in with Google.");
      setOpenSnackbar(true);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div>
      <section className="auth bg-base d-flex flex-wrap">
        <div className="auth-left d-lg-block d-none">
          <div className="d-flex align-items-center flex-column h-100 justify-content-center">
            <img src={Img1} alt="" />
          </div>
        </div>
        <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
          <Container maxWidth="sm">
            <Box
              sx={{
                mt: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={Img2}
                alt="Logo"
                style={{ marginBottom: "40px", maxWidth: "290px" }}
              />
              <Typography
                component="h1"
                variant="h5"
                style={{ color: "#4D6E72" }}
              >
                Sign In
              </Typography>

              <Typography variant="body2" color="textSecondary" align="center">
                Welcome back! Please enter your details
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  color="success"
                  type="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  required
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  color="success"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HttpsIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handlePasswordToggle}>
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Sign In"}
                </Button>
                {/* <div className="mt-32 center-border-horizontal text-center">
                  <span className="bg-base z-1 px-4">Or sign in with</span>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={handleGoogleSignIn}
                    disabled={googleLoading}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: "12px",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    {googleLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <>
                        <iconify-icon
                          icon="logos:google-icon"
                          className="text-primary-600 text-xl line-height-1"
                        ></iconify-icon>
                        Google
                      </>
                    )}
                  </Button>
                </Box> */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-primary-600 fw-semibold">
                    Sign Up
                  </Link>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  Are you Professional Doctor?{" "}
                  <Link
                    to="/doctor-signup"
                    className="text-primary-600 fw-semibold"
                  >
                    Sign Up Here
                  </Link>
                </Typography>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <Link
                    to="/forget-password"
                    className="text-primary-600 fw-medium"
                  >
                    Forgot Password?
                  </Link>
                </Box>
              </Box>
            </Box>
          </Container>
        </div>
      </section>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
