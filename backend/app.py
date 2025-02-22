import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
import joblib
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv(r"C:\Users\Admin\Desktop\CARRER NAVIGATOR\career-navigator\backend\dataset9000.csv")

# Keep only relevant features
selected_features = [
    "Programming Skills", "Software Development", "AI ML", "Data Science",
    "Database Fundamentals", "Networking", "Software Engineering"
]
df = df[selected_features + ["Role"]]

# Filter only relevant job roles
relevant_roles = [
    "Software Developer", "AI ML Engineer", "Data Scientist",
    "Database Administrator", "Networking Engineer", "Software Tester", "Cybersecurity Specialist"
]
df = df[df["Role"].isin(relevant_roles)]

# Convert categorical ratings into numerical values
rating_map = {
    "Not Interested": 0, "Poor": 1, "Beginner": 2, 
    "Average": 3, "Intermediate": 4, "Excellent": 5
}
for col in selected_features:
    df[col] = df[col].map(rating_map)

# Encode job roles
label_encoder = LabelEncoder()
df["Role"] = label_encoder.fit_transform(df["Role"])

# Train-test split
X = df[selected_features]
y = df["Role"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build pipeline
model_pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("classifier", RandomForestClassifier(n_estimators=100, random_state=42))
])

# Train the model
model_pipeline.fit(X_train, y_train)

# Predict on the test set
y_pred = model_pipeline.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Save the trained model and encoders
joblib.dump(model_pipeline, "career_predictor.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

print("🎉 Model training complete! Saved as 'career_predictor.pkl'")
