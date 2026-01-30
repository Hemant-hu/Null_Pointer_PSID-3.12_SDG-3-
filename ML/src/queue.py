patients = []

priority_order = {
    "CRITICAL": 4,
    "HIGH": 3,
    "MEDIUM": 2,
    "LOW": 1
}

def add_patient(data, priority):
    data["priority"] = priority
    patients.append(data)
    patients.sort(key=lambda x: priority_order[x["priority"]], reverse=True)
    return patients
