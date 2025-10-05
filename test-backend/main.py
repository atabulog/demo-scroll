# fastapi-backend/app.py
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import json
from pathlib import Path
import uvicorn

# File-based storage for persistence during development
DATA_FILE = Path("data/storage.json")
DATA_FILE.parent.mkdir(exist_ok=True)


def load_data(path: Path) -> any:
    if path.exists():
        state = json.load(f)        
    else:
        state = {"title": "Default Project Title"}
    return state

if __name__ == "__main__":
    stored_data = load_data(DATA_FILE)
    app: FastAPI = FastAPI()