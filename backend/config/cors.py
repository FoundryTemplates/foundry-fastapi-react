from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .foundry_loader import get_frontend_host

def setup_cors(app: FastAPI) -> None:
    frontend_host = get_frontend_host()
    
    allowed_origins = []
    if frontend_host:
        allowed_origins.append(frontend_host)
    else:
        # Defaults for local development if not defined in foundry.json
        allowed_origins = [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )