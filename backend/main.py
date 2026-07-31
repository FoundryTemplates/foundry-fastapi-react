from fastapi import FastAPI
from config.cors import setup_cors

app = FastAPI()

# Apply CORS configuration
setup_cors(app)

# Store state in memory
counter = {"value": 0}

@app.get("/count")
def count():
    return {"count": counter["value"]}

@app.put('/count')
def increase_count():
    counter["value"] += 1
    return {"count": counter["value"]}

@app.get("/reset")
def reset_counter():
    counter["value"] = 0
    return {"count": counter["value"]}