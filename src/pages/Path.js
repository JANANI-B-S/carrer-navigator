import React, { useEffect, useState } from "react";
import axios from "axios";

const Path = ({ chosenRole }) => {
    const [savedRole, setSavedRole] = useState(localStorage.getItem("careerPath") || "");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (chosenRole) {
            setSavedRole(chosenRole);
            localStorage.setItem("careerPath", chosenRole); // Save role
            fetchCourses(chosenRole);
        }
    }, [chosenRole]);

    const fetchCourses = async (role) => {
        if (!role) return;

        setLoading(true);
        setError(null);

        try {
            console.log(`🔵 Fetching courses for role: ${role}`);

            const response = await axios.get(`http://127.0.0.1:5000/recommend?role=${encodeURIComponent(role)}&num=5`);

            console.log("📥 API Response in Path.js:", response.data);

            if (Array.isArray(response.data) && response.data.length > 0) {
                setCourses(response.data);
            } else {
                setError("No recommendations found.");
            }
        } catch (error) {
            console.error("❌ Error fetching recommendations:", error);
            setError("Failed to load recommendations. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="career-path-container">
            <h2>Your Chosen Career Path</h2>
            {savedRole ? <p>You have selected: <strong>{savedRole}</strong></p> : <p>No career role selected yet.</p>}

            <h3>Recommended Courses</h3>
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                <ul>
                    {courses.map((course, index) => (
                        <li key={index}>
                            <strong>{course["Course Name"]}</strong>
                            <br />
                            <a href={course["Course URL"]} target="_blank" rel="noopener noreferrer">Course Link</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Path;
