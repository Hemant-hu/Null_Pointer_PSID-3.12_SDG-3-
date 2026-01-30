import joblib
import pandas as pd

from src.preprocess import preprocess

# Load trained hospital model
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
model, columns = joblib.load(os.path.join(BASE_DIR, "models", "ktas_model.pkl"))


def predict_patient(data):
    df = pd.DataFrame([data])
    df = preprocess(df)

    # Ensure same features as training
    df = df.reindex(columns=columns, fill_value=0)

    ktas = model.predict(df)[0]

    if ktas == 1:
        priority = "CRITICAL"
    elif ktas == 2:
        priority = "HIGH"
    elif ktas == 3:
        priority = "MEDIUM"
    else:
        priority = "LOW"

    return ktas, priority
