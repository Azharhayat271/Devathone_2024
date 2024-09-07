import React, { useState } from 'react';
import Img1 from "./../../assets/images/auth/auth/auth-img.png";
import Img2 from "./../../assets/images/auth/logo.png";
import EmailIcon from '@mui/icons-material/Email';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import  {ForgetPasswordAPIs}  from '../../API/auth/forgetpassword';
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await ForgetPasswordAPIs({ email });
        if (response.data==null) {

            setError(response.error);
            setOpenSnackbar(true);
        } else {

            setSuccessMessage("Password reset link has been sent to your email.");
            setOpenSnackbar(true);
            setEmail('');
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
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
                    <div className="max-w-464-px mx-auto w-100">
                        <div>
                            <a href="index.html" className="mb-40 max-w-290-px">
                                <img src={Img2} alt="" />
                            </a>
                            <h4 className="mb-12">Forgot Password</h4>
                            <p className="mb-32 text-secondary-light text-lg">Enter your email to reset your password</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="icon-field mb-16">
                                <span className="icon top-50 translate-middle-y">
                                    <EmailIcon />
                                </span>
                                <input
                                    type="email"
                                    className="form-control h-56-px bg-neutral-50 radius-12"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">Send Reset Link</button>
                            <div className="mt-32 text-center text-sm">
                                <p className="mb-0">Remember your password? <Link to="/login" className="text-primary-600 fw-semibold">Sign In</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                    {error || successMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ForgetPassword;