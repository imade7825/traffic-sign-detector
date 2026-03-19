from fastapi import FastAPI
from app.routes.health_route import health_router

application = FastAPI(title="Traffic Sign Detector Backend", description="Backend service for traffic sign detection.", version="0.1.0")
application.include_router(health_router)