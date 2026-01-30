from fastapi import FastAPI
from src.predict import predict_patient
from src.queue import add_patient

app = FastAPI()

@app.post("/add_patient")
def add(data: dict):
    ktas, priority = predict_patient(data)
    queue = add_patient(data, priority)

    return {
        "ktas": int(ktas),
        "priority": priority,
        "queue": queue
    }
