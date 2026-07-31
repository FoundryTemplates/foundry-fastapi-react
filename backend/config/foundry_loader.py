import json
from pathlib import Path
from typing import Any, Dict

def load_foundry_config() -> Dict[str, Any]:
    # Locate foundry.json at the root (one directory up from backend/)
    config_path = Path(__file__).resolve().parent.parent / "foundry.json"
    
    if config_path.is_file():
        try:
            with open(config_path, "r") as f:
                return json.load(f)
        except Exception as e:
            print(f"Warning: Failed to parse foundry.json: {e}")
            
    return {}

def get_frontend_host() -> str | None:
    config = load_foundry_config()
    # Support both host.frontend and hosts.frontend
    return config.get("host", {}).get("frontend") or config.get("hosts", {}).get("frontend")