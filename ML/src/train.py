import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from src.preprocess import preprocess

import os

# Load clean hospital data
df = pd.read_csv("../data/clean_patient_data.csv")

# Preprocess
df = preprocess(df)

# Split into features & target
X = df.drop("KTAS", axis=1)
y = df["KTAS"]

# Train hospital-grade triage model
model = RandomForestClassifier(n_estimators=300, random_state=42)
model.fit(X, y)

# Save model + feature list
os.makedirs("../models", exist_ok=True)
joblib.dump((model, X.columns), "../models/ktas_model.pkl")

print("KTAS hospital triage model trained")
