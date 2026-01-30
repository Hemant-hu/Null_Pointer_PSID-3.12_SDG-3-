import pandas as pd

raw = pd.read_csv(
    "../data/data.csv",
    sep=";",
    encoding="latin1",
    engine="python"
)

print("Detected columns:", raw.columns.tolist())

raw.to_csv("../data/patient_data_standardized.csv", index=False)

print("Standardized CSV saved")
