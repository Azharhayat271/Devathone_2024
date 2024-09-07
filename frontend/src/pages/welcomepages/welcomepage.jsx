import React, { useEffect, useState } from "react";

const WelcomePage = () => {
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("");

  // Get the user's name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Calculate greeting based on the current time
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
        paddingTop: "80px",
      }}
    >
      <div className="text-center">
        {/* Welcome Message */}
        <h1
          className="display-4 mb-4"
          style={{
            fontWeight: "bold",
            color: "#333",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {greeting}, {userName}!
        </h1>
        <p
          className="lead"
          style={{ color: "#666", fontSize: "1.5rem" }}
        >
          We're here to help you every step of the way.
        </p>

        {/* Decorative Floating Circles */}
        <div
          className="position-absolute"
          style={{
            bottom: "10%",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.3)",
            animation: "float 6s ease-in-out infinite",
          }}
        ></div>
        <div
          className="position-absolute"
          style={{
            top: "20%",
            right: "20%",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.3)",
            animation: "float 8s ease-in-out infinite",
          }}
        ></div>
        <div
          className="position-absolute"
          style={{
            bottom: "30%",
            right: "5%",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.3)",
            animation: "float 10s ease-in-out infinite",
          }}
        ></div>
      </div>
    </div>
  );
};

export default WelcomePage;
