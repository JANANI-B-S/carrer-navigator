import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Progress = ({ certificates, completedProjects }) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Progress Overview</h2>
            <div className="flex justify-center items-center gap-20">
                {/* Certificate Chart */}
                <div className="w-64 h-64 bg-white p-4 rounded-lg shadow-md">
                    <Pie
                        data={{
                            labels: ["Completed", "Remaining"],
                            datasets: [
                                {
                                    data: [
                                        Object.values(certificates).filter(v => v === "Valid").length,
                                        Object.keys(certificates).length - Object.values(certificates).filter(v => v === "Valid").length,
                                    ],
                                    backgroundColor: ["#4CAF50", "#FF5722"],
                                },
                            ],
                        }}
                    />
                    <p className="text-center text-gray-700 mt-2">Course Completion</p>
                </div>

                {/* Project Chart */}
                <div className="w-64 h-64 bg-white p-4 rounded-lg shadow-md">
                    <Pie
                        data={{
                            labels: ["Completed", "Remaining"],
                            datasets: [
                                {
                                    data: [
                                        Object.values(completedProjects).filter(Boolean).length,
                                        Object.keys(completedProjects).length - Object.values(completedProjects).filter(Boolean).length,
                                    ],
                                    backgroundColor: ["#4CAF50", "#FF5722"],
                                },
                            ],
                        }}
                    />
                    <p className="text-center text-gray-700 mt-2">Project Completion</p>
                </div>
            </div>
        </div>
    );
};

export default Progress;
