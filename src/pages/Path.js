
/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../output.css";
import { useNavigate } from "react-router-dom";

const Path = ({ chosenRole }) => {
    const apiKey ="AIzaSyCOsgEwI8iLcE4z1IcCfZdVCcyFcMQD0jU"; // Use .env file
    const [savedRole, setSavedRole] = useState(localStorage.getItem("careerPath") || "");
    const [courses, setCourses] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const styles = {
        container: {
          fontFamily: "Arial, sans-serif",
          background: "linear-gradient(135deg,rgb(174, 217, 224),rgb(57, 167, 201))",
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
    useEffect(() => {
        if (chosenRole) {
            setSavedRole(chosenRole);
            localStorage.setItem("careerPath", chosenRole);
            fetchRecommendations(chosenRole);
        }
    }, [chosenRole]);

    useEffect(() => {
        if (savedRole && !chosenRole) {
            fetchRecommendations(savedRole);
        }
    }, []);

    const fetchRecommendations = async (role) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: `Suggest courses (with links, provider, and skills learned) and projects with step-by-step implementation and GitHub references for a ${role}. Provide strictly valid JSON like this:
                                    {
                                        "courses": [
                                            {"name": "Course 1", "provider": "Company X", "link": "https://example.com", "skills": ["Skill 1", "Skill 2"]},
                                            {"name": "Course 2", "provider": "Company Y", "link": "https://example.com", "skills": ["Skill A", "Skill B"]}
                                        ],
                                        "projects": [
                                            {
                                                "name": "Project 1",
                                               
                                                "steps": ["Step 1", "Step 2", "Step 3"],
                                                "skills": ["Skill X", "Skill Y"]
                                            },
                                            {
                                                "name": "Project 2",
                                               
                                                "steps": ["Step 1", "Step 2", "Step 3"],
                                                "skills": ["Skill M", "Skill N"]
                                            }
                                        ]
                                    }`
                                }
                            ]
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Raw API Response:", response.data);
            if (response.data && response.data.candidates) {
                let rawText = response.data.candidates[0].content.parts[0].text;
                rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
                console.log("Cleaned JSON Response:", rawText);
                const parsedData = JSON.parse(rawText);
                setCourses(parsedData.courses || []);
                setProjects(parsedData.projects || []);
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setError("Failed to fetch recommendations. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
           
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto p-8 bg-blue shadow-l rounded-2xl border border-gray-300"
        >
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
            <h2 className="text-4xl font-extrabold text-center text-gray-900">Career Path</h2>
            {savedRole ? (
                <p className="text-lg text-center text-gray-700 my-4">You selected: <strong>{savedRole}</strong></p>
            ) : (
                <p className="text-lg text-center text-gray-500">No career role selected yet.</p>
            )}

            <h3 className="text-2xl font-semibold text-gray-700 mt-6">Recommended Courses</h3>
            {loading ? (
                <p className="text-gray-500">Loading courses...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : courses.length > 0 ? (
                <motion.div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                            <h4 className="font-semibold text-lg">{course.name}</h4>
                            <p className="text-sm">Provider: {course.provider}</p>
                            <p className="text-sm">Skills: {course.skills.join(", ")}</p>
                            <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-sm underline">Course Link</a>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <p className="text-gray-500">No courses found.</p>
            )}

            <h3 className="text-2xl font-semibold text-gray-700 mt-6">Recommended Projects</h3>
            {loading ? (
                <p className="text-gray-500">Loading projects...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : projects.length > 0 ? (
                <motion.ul className="mt-4 space-y-4">
                    {projects.map((project, index) => (
                        <motion.li key={index} whileHover={{ scale: 1.02 }} className="p-5 bg-green-100 rounded-xl shadow-md hover:bg-green-200">
                            <strong className="text-green-800">{project.name}</strong>
                            <p className="text-sm text-gray-700">Skills Gained: {project.skills.join(", ")}</p>
                          
                            <ul className="list-disc ml-5 mt-2 text-gray-700">
                                {project.steps.map((step, stepIndex) => (
                                    <motion.li key={stepIndex} whileHover={{ scale: 1.03 }}>{step}</motion.li>
                                ))}
                            </ul>
                        </motion.li>
                    ))}
                </motion.ul>
            ) : (
                <p className="text-gray-500">No projects found.</p>
            )}
        </motion.div>
    );
};

export default Path;
/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

const Path = ({ chosenRole }) => {
    const apiKey = "AIzaSyAYf0FJP9XmSfYFOzsbIBfWg1kX-y3zKyc";
    const [savedRole, setSavedRole] = useState(localStorage.getItem("careerPath") || "");
    const [courses, setCourses] = useState([]);
    const [projects, setProjects] = useState([]);
    const [completedCourses, setCompletedCourses] = useState(JSON.parse(localStorage.getItem("completedCourses")) || {});
    const [completedProjects, setCompletedProjects] = useState(JSON.parse(localStorage.getItem("completedProjects")) || {});
    const navigate = useNavigate();
    
    useEffect(() => {
        if (chosenRole) {
            setSavedRole(chosenRole);
            localStorage.setItem("careerPath", chosenRole);
            fetchRecommendations(chosenRole);
        }
    }, [chosenRole]);

    useEffect(() => {
        if (savedRole && !chosenRole) {
            fetchRecommendations(savedRole);
        }
    }, []);

    const fetchRecommendations = async (role) => {
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: `Suggest courses and projects for a ${role} in JSON format.`
                                }
                            ]
                        }
                    ]
                },
                { headers: { "Content-Type": "application/json" } }
            );
            
            let rawText = response.data.candidates[0].content.parts[0].text;
            rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
            const parsedData = JSON.parse(rawText);
            setCourses(parsedData.courses || []);
            setProjects(parsedData.projects || []);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    const toggleCompletion = (type, name) => {
        const updatedCompletion = type === "course" ? { ...completedCourses } : { ...completedProjects };
        updatedCompletion[name] = !updatedCompletion[name];
        
        if (type === "course") {
            setCompletedCourses(updatedCompletion);
            localStorage.setItem("completedCourses", JSON.stringify(updatedCompletion));
        } else {
            setCompletedProjects(updatedCompletion);
            localStorage.setItem("completedProjects", JSON.stringify(updatedCompletion));
        }
    };

    const calculateProgress = () => {
        const totalItems = courses.length + projects.length;
        const completedItems = Object.values(completedCourses).filter(v => v).length +
                               Object.values(completedProjects).filter(v => v).length;
        return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    };

    return (
        <motion.div className="p-8 bg-blue-100 min-h-screen">
            <h2 className="text-4xl font-bold text-center">Career Path</h2>
            <p className="text-lg text-center">Selected Role: <strong>{savedRole}</strong></p>
            
            <h3 className="text-2xl font-semibold mt-6">Recommended Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course, index) => (
                    <div key={index} className="p-4 bg-white shadow rounded-lg">
                        <h4 className="font-semibold">{course.name}</h4>
                        <a href={course.link} target="_blank" className="text-blue-500">Course Link</a>
                        <button 
                            onClick={() => toggleCompletion("course", course.name)}
                            className={`mt-2 px-4 py-2 ${completedCourses[course.name] ? "bg-green-500" : "bg-gray-500"} text-white rounded-lg`}
                        >
                            {completedCourses[course.name] ? "Completed" : "Mark as Completed"}
                        </button>
                    </div>
                ))}
            </div>
            
            <h3 className="text-2xl font-semibold mt-6">Recommended Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                    <div key={index} className="p-4 bg-white shadow rounded-lg">
                        <h4 className="font-semibold">{project.name}</h4>
                        <button 
                            onClick={() => toggleCompletion("project", project.name)}
                            className={`mt-2 px-4 py-2 ${completedProjects[project.name] ? "bg-green-500" : "bg-gray-500"} text-white rounded-lg`}
                        >
                            {completedProjects[project.name] ? "Completed" : "Mark as Completed"}
                        </button>
                    </div>
                ))}
            </div>
            
            <h3 className="text-2xl font-semibold mt-6">Progress</h3>
            <ProgressBar completed={calculateProgress()} bgColor="#4CAF50" labelColor="#fff" />
        </motion.div>
    );
};

export default Path;*/
import axios from "axios";
import { motion } from "framer-motion";
import Tesseract from "tesseract.js";
import "../output.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { PieChart } from "recharts";


const Path = ({ chosenRole }) => {
    const apiKey = "AIzaSyCOsgEwI8iLcE4z1IcCfZdVCcyFcMQD0jU"; // Use .env file
    const [savedRole, setSavedRole] = useState(localStorage.getItem("careerPath") || "");
    const [courses, setCourses] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [certificates, setCertificates] = useState({});
    const [completedProjects, setCompletedProjects] = useState({});
    const navigate = useNavigate();

      
        const styles = {
          container: {
            fontFamily: "Arial, sans-serif",
            background: "linear-gradient(135deg,rgb(174, 217, 224),rgb(57, 167, 201))",
          
        
           
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
          }
        
         
        }
    useEffect(() => {
        if (chosenRole) {
            setSavedRole(chosenRole);
            localStorage.setItem("careerPath", chosenRole);
            fetchRecommendations(chosenRole);
        }
    }, [chosenRole]);

    useEffect(() => {
        if (savedRole && !chosenRole) {
            fetchRecommendations(savedRole);
        }
    }, []);

    const fetchRecommendations = async (role) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: `Suggest courses (with links, provider, and skills learned) that can be completed within 8 weeks and projects with step-by-step implementation and GitHub references for a ${role}. Provide strictly valid JSON like this:
                                    {
                                        "courses": [
                                            {"name": "Course 1", "provider": "Company X", "link": "https://example.com", "skills": ["Skill 1", "Skill 2"], "duration": "6 weeks"},
                                            {"name": "Course 2", "provider": "Company Y", "link": "https://example.com", "skills": ["Skill A", "Skill B"], "duration": "8 weeks"}
                                        ],
                                        "projects": [
                                            {
                                                "name": "Project 1",
                                                "steps": ["Step 1", "Step 2", "Step 3"],
                                                "skills": ["Skill X", "Skill Y"]
                                            },
                                            {
                                                "name": "Project 2",
                                                "steps": ["Step 1", "Step 2", "Step 3"],
                                                "skills": ["Skill M", "Skill N"]
                                            }
                                        ]
                                    }`
                                }
                            ]
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Raw API Response:", response.data);
            if (response.data && response.data.candidates) {
                let rawText = response.data.candidates[0].content.parts[0].text;
                rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim(); // Remove Markdown formatting
                console.log("Cleaned JSON Response:", rawText);
                const parsedData = JSON.parse(rawText);
                setCourses(parsedData.courses || []);
setProjects(parsedData.projects || []);
console.log("Courses Updated:", parsedData.courses);
console.log("Projects Updated:", parsedData.projects);

                
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setError("Failed to fetch recommendations. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCertificateUpload = async (event, courseName) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const { data: { text } } = await Tesseract.recognize(file, "eng");
                console.log("Extracted Text:", text);
                const isValid = text.toLowerCase().includes(courseName.toLowerCase());
                setCertificates(prev => ({ ...prev, [courseName]: isValid ? "Valid" : "Invalid" }));
            } catch (error) {
                console.error("OCR Error:", error);
                setCertificates(prev => ({ ...prev, [courseName]: "Error Processing" }));
            }
        }
    };
   
    
        const markProjectCompleted = (projectName) => {
            setCompletedProjects(prev => {
                const updatedProjects = { ...prev };
                if (updatedProjects[projectName]) {
                    delete updatedProjects[projectName]; 
                    // Remove from completed if toggled back
                } else {
                    updatedProjects[projectName] = true; // Mark as completed
                }
                return updatedProjects;
            });
        };
        
    
    return (
        
        <div style={styles.container}>
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto p-8 bg-blue shadow-l rounded-2xl border border-gray-300"
    >
        
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
      
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Career Path</h2>
        {savedRole ? (
            <p className="text-lg text-center text-gray-700 my-4">You selected: <strong>{savedRole}</strong></p>
        ) : (
            <p className="text-lg text-center text-gray-500">No career role selected yet.</p>
        )}
      {/* Centered Chart Section */}
      
        {/* Centered Chart Section */}
        
        <div className="flex flex-col items-center">
        <h2 className="text-2xl font-extrabold text-center text-gray-400">Progress Overview </h2>
        
    <motion.div className="flex gap-4 w-full max-w-2xl justify-center">
        
        {/* Course Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-[180px] h-[180px]">
            <h2 className="text-xs font-semibold mb-1 text-center">Courses Progress</h2>
            <div className="w-[120px] h-[120px] flex justify-center items-center">
                <Pie data={{
                    labels: ["Completed", "Remaining"],
                    datasets: [{
                        data: [
                            Object.values(certificates).filter(v => v === "Valid").length, 
                            courses.length - Object.values(certificates).filter(v => v === "Valid").length
                        ],
                        backgroundColor: ["#4CAF50", "#FF5722"]
                    }]
                }} />
            </div>
        </div>

        {/* Project Chart */}
        <div className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center w-[180px] h-[180px]">
            <h2 className="text-xs font-semibold mb-1 text-center text-black">Projects Progress</h2>
            <div className="w-[120px] h-[120px] flex justify-center items-center">
                <Pie data={{
                    labels: ["Completed", "Remaining"],
                    datasets: [{
                        data: [
                            Object.values(completedProjects).length, 
                            projects.length - Object.values(completedProjects).length
                        ],
                        backgroundColor: ["#4CAF50", "#FF5722"]
                    }]
                }} />
            </div>
        </div>

    </motion.div>
</div>

<h3 className="text-2xl font-semibold text-gray-700 mt-6">Skills Gained from Completed Courses & Projects</h3>

{Object.keys(completedProjects).length > 0 || Object.values(certificates).includes("Valid") ? (
    <motion.div 
        whileHover={{ scale: 1.02 }} 
        className="p-6 bg-purple-100 rounded-xl shadow-md hover:bg-purple-200"
    >
        <p className="text-gray-700 font-medium text-m">
            {[ 
                ...new Set([
                    ...projects
                        .filter((project) => completedProjects[project.name]) 
                        .flatMap((project) => project.skills),
                    ...courses
                        .filter((course) => certificates[course.name] === "Valid") 
                        .flatMap((course) => course.skills)
                ])
            ].join(", ")}
        </p>
    </motion.div>
) : (
    <p className="text-gray-500">No completed courses or projects yet.</p>
)}




            <h3 className="text-2xl font-semibold text-gray-700 mt-6">Recommended Courses</h3>
            {loading ? (
                <p className="text-gray-500">Loading courses...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : courses.length > 0 ? (
                <motion.div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                            <h4 className="font-semibold text-lg">{course.name}</h4>
                            <p className="text-sm">Provider: {course.provider}</p>
                            <p className="text-sm">Skills: {course.skills.join(", ")}</p>
                            <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-sm underline">Course Link</a>
                            <input type="file" onChange={(e) => handleCertificateUpload(e, course.name)} className="mt-2" />
                            {certificates[course.name] && (
                                <p className={`text-sm mt-2 ${certificates[course.name] === "Valid" ? "text-green-500" : "text-red-500"}`}>
                                    {certificates[course.name] === "Valid" ? "Certificate Verified!" : "Invalid Certificate!"}
                                </p>
                            )}
                            <div className="w-full h-2 bg-gray-300 rounded-full mt-2">
                                <div className={`h-full ${certificates[course.name] === "Valid" ? "bg-green-500" : "bg-white"} rounded-full`} style={{ width: certificates[course.name] === "Valid" ? "100%" : "0%" }}></div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <p className="text-gray-500">No courses found.</p>
            )}
    
         
    <h3 className="text-2xl font-semibold text-gray-700 mt-6">Recommended Projects</h3>

{loading ? (
    <p className="text-gray-500">Loading projects...</p>
) : error ? (
    <p className="text-red-500">{error}</p>
) : projects.length > 0 ? (
    <motion.ul className="mt-4 space-y-4">
        {projects.map((project, index) => (
            <motion.li 
                key={index} 
                whileHover={{ scale: 1.02 }} 
                className="p-5 bg-green-100 rounded-xl shadow-md hover:bg-green-200"
            >
                <strong className="text-green-800">{project.name}</strong>
                <p className="text-sm text-gray-700">Skills Gained: {project.skills.join(", ")}</p>

                <ul className="list-disc ml-5 mt-2 text-gray-700">
                    {project.steps.map((step, stepIndex) => (
                        <motion.li key={stepIndex} whileHover={{ scale: 1.03 }}>
                            {step.replace(/\*/g, "")} {/* Removes * from text */}
                        </motion.li>
                    ))}
                </ul>

                <button 
                    onClick={() => markProjectCompleted(project.name)} 
                    className={`mt-2 px-4 py-2 rounded-lg transition-all duration-300 
                        ${completedProjects[project.name] ? "bg-green-600 text-black" : "bg-red-500 text-black"}`}
                >
                    {completedProjects[project.name] ? "Completed ✅" : "Uncompleted ⏳"}
                </button>
            </motion.li>
        ))}
    </motion.ul>
) : (
    <p className="text-gray-500">No recommended projects yet.</p>
)}


     </motion.div>
     </div>
     
    );
};

export default Path;
