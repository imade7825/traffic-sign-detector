from fastapi import APIRouter
from app.schemas.health_response import HealthResponse
from app.services.application_health_service import create_health_response

health_router = APIRouter(tags=["health"])

@health_router.get("/health", response_model=HealthResponse)
def read_health_status() -> HealthResponse:
    return create_health_response()

     