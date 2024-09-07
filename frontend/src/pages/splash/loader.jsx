import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from './../../assets/json/loader.json';

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            const token = localStorage.getItem('token');

            // Navigate based on token presence
            if (token) {
                navigate('/newDashboardDesign');
            } else {
                navigate('/login');
            }
        }, 5000); // Adjust the time as needed (e.g., 3000ms = 3 seconds)

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={styles.container}>
            <Lottie animationData={animationData} style={styles.lottie} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fff', // Change as needed
    },
    lottie: {
        width: 300, // Adjust the size as needed
        height: 300,
    },
};

export default SplashScreen;
