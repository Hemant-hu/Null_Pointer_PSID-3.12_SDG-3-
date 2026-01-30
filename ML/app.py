from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.predict import predict_patient
from src.queue import add_patient
from pydantic import BaseModel

app = FastAPI()

# ✅ REQUIRED FOR REACT
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



class PatientInput(BaseModel):
    Gender: int
    Age: int
    Arrival: int
    Injury: int
    Symptoms: str
    Mental: int
    Pain: int
    Pain_Score: int
    SBP: int
    DBP: int
    HR: int
    RR: int
    BT: float
    SpO2: int



# ✅ DO NOT USE "/"
@app.post("/add_patient")
def add(data: PatientInput):
    print("✅ RECEIVED:", data)

    # convert to dict exactly as ML expects
    input_dict = data.dict()

    ktas, priority = predict_patient(input_dict)
    queue = add_patient(input_dict, priority)

    return {
        "ktas": int(ktas),
        "priority": priority,
        "queue": queue
    }
