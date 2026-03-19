from app.schemas.health_response import HealthResponse

def create_health_response() -> HealthResponse:
    return HealthResponse(status="ok", message="The backend is running.")