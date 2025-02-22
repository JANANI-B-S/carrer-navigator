import React, { useState, useEffect } from "react";
import Path from "./Path"; 
import { useNavigate } from "react-router-dom";
import "./Prediction.css";
import backgroundImage from '../assets/second.jpg';


const Prediction = () => {
    const navigate = useNavigate();
  
    const styles = {
      container: {
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg,rgb(221, 233, 235),rgb(168, 226, 243))",
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
      image: {
        width: "80%",
        maxWidth: "500px",
        marginTop: "20px",
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
    }
    const [ratings, setRatings] = useState({
        "Programming Skills": "", "Software Development": "", "AI ML": "",
        "Data Science": "", "Database Fundamentals": "", "Networking": "", "Software Engineering": ""
    });
    const [predictedRoles, setPredictedRoles] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(""); 
    const [careerPath, setCareerPath] = useState(localStorage.getItem("careerPath") || null);  
    const [view, setView] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/all_roles")
            .then(response => response.json())
            .then(data => setAllRoles(data.roles || []))
            .catch(error => console.error("Error fetching roles:", error));
    }, []);

    const handleRatingChange = (skill, value) => {
        setRatings(prev => ({ ...prev, [skill]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ratings })
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            setPredictedRoles(data.top_roles || []);
        } catch (error) {
            console.error("Error fetching predictions:", error);
        }
    };

    const handleCareerChoice = async (role) => {
        if (!role) return;

        try {
            await fetch("http://localhost:8000/add_career_path", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            });

            setCareerPath(role);
            localStorage.setItem("careerPath", role);
            setPredictedRoles([]);
            alert(`🎯 Career role "${role}" added successfully!`);
        } catch (error) {
            console.error("Error adding career role:", error);
        }
    };

    const handleRemoveRole = () => {
        setCareerPath(null);
        setSelectedRole("");
        localStorage.removeItem("careerPath");
    };

    return (
     
     

        <div style={styles.container}>
            <div style={styles.navbar}>
        <span
          style={styles.navLink}
          onClick={() => navigate("/")}
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
     
      
      <div className="prediction-container">
            <h2 className="title">🚀 Career Navigator</h2>

            <div className="tab-buttons">
                <button className={`tab ${view === "test" ? "active" : ""}`} onClick={() => setView("test")}>
                    📝 Test Yourself
                </button>
                <button className={`tab ${view === "manual" ? "active" : ""}`} onClick={() => setView("manual")}>
                    🎯 Choose Manually
                </button>
            </div>

            {view === "test" && (
                <div className="test-section">
                    <h3 className="section-title">📊 Rate Your Skills</h3>
                    <div className="skills-container">
                        {Object.keys(ratings).map((skill) => (
                            <div key={skill} className="skill-row">
                                <label className="skill-label">{skill}: </label>
                                <select className="skill-dropdown" value={ratings[skill]} onChange={(e) => handleRatingChange(skill, e.target.value)}>
                                    <option value="">Skip</option>
                                    <option value="0">Not Interested</option>
                                    <option value="1">Poor</option>
                                    <option value="2">Beginner</option>
                                    <option value="3">Average</option>
                                    <option value="4">Intermediate</option>
                                    <option value="5">Excellent</option>
                                </select>
                            </div>
                        ))}
                    </div>
                    <button className="predict-btn" onClick={handleSubmit}>🔮 Predict Jobs</button>

                    {predictedRoles.length > 0 && !careerPath && (
                        <div className="results">
                            <h3 className="section-title">🏆 Top Career Matches:</h3>
                            <ul className="role-list">
                                {predictedRoles.map((role, index) => (
                                    <li key={index} className="role-item">
                                        {role} 
                                        <button className="choose-btn" onClick={() => handleCareerChoice(role)}>✅ Choose</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {view === "manual" && (
                <div className="manual-section">
                    <h3 className="section-title">🎯 Select a Career Manually</h3>
                    {careerPath ? (
                        <div className="career-choice">
                            <h3 className="chosen-role">✅ Chosen Path: {careerPath}</h3>
                            <button className="remove-btn" onClick={handleRemoveRole}>❌ Remove</button>
                        </div>
                    ) : (
                        <>
                            <select className="role-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                                <option value="">Select a Role</option>
                                {allRoles.map((role, index) => (
                                    <option key={index} value={role}>{role}</option>
                                ))}
                            </select>
                            <button className="add-btn" onClick={() => handleCareerChoice(selectedRole)} disabled={!selectedRole}>
                                ➕ Add to Career Path
                            </button>
                        </>
                    )}
                </div>
            )}

            <Path chosenRole={careerPath} />
        </div>
        </div>
    );
};

export default Prediction;
