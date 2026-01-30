import pandas as pd

def preprocess(df):

    # Gender: 1=Female, 2=Male → 0/1
    df["Gender"] = df["Gender"].map({1:0, 2:1})

    # Injury: 1=No, 2=Yes → 0/1
    df["Injury"] = df["Injury"].map({1:0, 2:1})

    # Mental state
    df["Mental"] = df["Mental"].fillna(1)

    # Pain yes/no
    df["Pain"] = df["Pain"].fillna(0)

    # Arrival mode
    df["Arrival"] = df["Arrival"].fillna(0)

    # Convert vitals to numbers (remove junk like '#BOÞ!')
    numeric_cols = ["Age","Pain_Score","SBP","DBP","HR","RR","BT","SpO2"]

    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    # Fill broken values with median
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())

    # One-hot encode symptoms
    df = pd.get_dummies(df, columns=["Symptoms"], drop_first=True)

    return df
