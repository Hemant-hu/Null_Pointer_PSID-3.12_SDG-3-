import pandas as pd

# Load standardized hospital data
df = pd.read_csv("../data/patient_data_standardized.csv")

# Select only columns used for triage prediction
df = df[[
    "Sex","Age","Arrival mode","Injury","Chief_complain","Mental","Pain","NRS_pain",
    "SBP","DBP","HR","RR","BT","Saturation","KTAS_expert"
]]

# Remove rows without KTAS label
df = df.dropna(subset=["KTAS_expert"])

# Rename columns for ML
df.columns = [
    "Gender","Age","Arrival","Injury","Symptoms","Mental","Pain","Pain_Score",
    "SBP","DBP","HR","RR","BT","SpO2","KTAS"
]

# Convert KTAS to int
df["KTAS"] = df["KTAS"].astype(int)

# Save clean dataset
df.to_csv("../data/clean_patient_data.csv", index=False)

print("Clean dataset ready")
