from fastapi import FastAPI, HTTPException
import pandas as pd
import joblib
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model & encoder
model = joblib.load("career_predictor.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Define request model for skill ratings
class SkillRatings(BaseModel):
    ratings: dict  # Dictionary with skill names as keys and user ratings as values
roles_list = ["Software Developer", "AI ML Engineer", "Data Scientist","Database Administrator", "Networking Engineer", "Software Tester", "Cybersecurity Specialist"]




@app.post("/predict")
def predict_role(user_input: SkillRatings):
    try:
        input_data = pd.DataFrame([user_input.ratings])

        # Ensure all required features are present
        selected_features = [
            "Programming Skills", "Software Development", "AI ML", "Data Science",
            "Database Fundamentals", "Networking", "Software Engineering"
        ]
        for feature in selected_features:
            if feature not in input_data.columns:
                input_data[feature] = 0

        # Predict probabilities for all roles
        probabilities = model.predict_proba(input_data)[0]

        # Get top 3 role indices
        top_3_indices = np.argsort(probabilities)[-3:][::-1]

        # Get class labels
        predicted_roles = label_encoder.inverse_transform(top_3_indices)

        return {"top_roles": predicted_roles.tolist()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Define request model for career path addition
class CareerChoice(BaseModel):
    role: str

@app.post("/add_career_path")
def add_career_path(user_choice: CareerChoice):
    return {"message": f'Career role "{user_choice.role}" has been added to your career path'}
