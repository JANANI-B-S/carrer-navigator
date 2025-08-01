import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

import firstimage from "../assets/firstimage.png";
const Home = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(135deg,rgb(46, 199, 219),rgb(91, 151, 219))",
      minHeight: "100vh",
      color: "white",
      textAlign: "center",
      padding: "20px",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "15px",
      background: "rgba(0, 0, 0, 0.8)",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    },
    navLink: {
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
      transition: "color 0.3s ease",
    },
    mainContent: {
      marginTop: "50px",
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
    image: {
      width: "80%",
      maxWidth: "500px",
      borderRadius: "12px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    },
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
      marginTop: "40px",
    },
    card: {
      background: "white",
      color: "#333",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      maxWidth: "300px",
      textAlign: "center",
      transition: "transform 0.3s ease",
    },
    button: {
      background: "black",
      color: "white",
      padding: "20px 20px ",
      marginTop:"20px",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <div style={styles.navbar}>
        <span
          style={styles.navLink}
          onClick={() => navigate("/home")}
          onMouseEnter={(e) => (e.target.style.color = "#ff4081")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Home
        </span>
        <span
          style={styles.navLink}
          onClick={() => navigate("/prediction")}
          onMouseEnter={(e) => (e.target.style.color = "#ff4081")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Prediction
        </span>
        <span
          style={styles.navLink}
          onClick={() => navigate("/path")}
          onMouseEnter={(e) => (e.target.style.color = "#ff4081")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Path
        </span>
      </div>

      {/* Main Content with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={styles.mainContent}
      >
        <h1>🚀 Welcome to Career Navigator</h1>
        <p>Your personalized AI-powered career guide to success.</p>
        <div style={styles.imageContainer}>
          <motion.img
            src={firstimage}
            alt="Career Path"
            style={styles.image}
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </motion.div>

      {/* Features Section */}
      <div style={styles.cardContainer}>
        <motion.div
          style={styles.card}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)" }}
        >
          <h3>📈<b> AI-Powered Prediction</b></h3>
          <p>Get AI recommendations for the best career paths.</p>
        </motion.div>

        <motion.div
          style={styles.card}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)" }}
        >
          <h3>📚 <b>Personalized Learning</b></h3>
          <p>Find courses and projects tailored to your goal.</p>
        </motion.div>

        <motion.div
          style={styles.card}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)" }}
        >
          <h3>📊<b> Track Your Progress</b></h3>
          <p>Monitor your growth with powerful visualizations.</p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.button
        style={styles.button}
        whileHover={{ scale: 1.1, background: "linear-gradient(to right, #4da6ff, #007bff, #0056b3)" }}
        onClick={() => navigate("/prediction")}
      >
        Start Your Journey 🚀
      </motion.button>
    </div>
  );
};

export default Home;
