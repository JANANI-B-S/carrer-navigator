import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import backgroundImage from "../assets/background.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = (response) => {
    const decoded = jwtDecode(response.credential);
    alert(`Welcome, ${decoded.name}!`);
    navigate("/home");
  };

  const styles = {
    landingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9",
      backgroundImage: `url(${backgroundImage})`,

    backgroundRepeat: "repeat",
      fontFamily: "Arial, sans-serif",
      padding: "0",
      margin: "0",
    },
    contentBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      width: "90%",
      maxWidth: "400px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333333",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#666666",
      marginBottom: "30px",
      lineHeight: "1.5",
    },
    buttonGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      width: "100%",
    },
    actionButton: {
      backgroundColor: "#007bff",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    },
    actionButtonHover: {
      backgroundColor: "#0056b3",
    },
    googleLogin: {
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.landingContainer}>
      <div style={styles.contentBox}>
        <h1 style={styles.title}>Welcome to Carrer Navigator Platform</h1>
        <p style={styles.subtitle}>
          Experience the best services by signing up or logging in to your
          account.
        </p>
        <div style={styles.buttonGroup}>
          <button
            onClick={() => navigate("/signup")}
            style={styles.actionButton}
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/signin")}
            style={styles.actionButton}
          >
            Sign In
          </button>
        </div>
        <div style={styles.googleLogin}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => alert("Google Sign-In failed")}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
