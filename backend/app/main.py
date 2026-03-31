# Diese Zeile importiert die FastAPI-Anwendungsklasse.
from fastapi import FastAPI

# Diese Zeile importiert den Router für den Detection-Endpunkt.
from app.routes.detect_route import detect_router

# Diese Zeile importiert den Router für den Health-Endpunkt.
from app.routes.health_route import health_router


# Diese Zeile erstellt die zentrale FastAPI-Anwendung.
application = FastAPI(
    title='Traffic Sign Detector Backend',
    description='Backend service for traffic sign detection.',
    version='0.1.0'
)

# Diese Zeile registriert den Health-Router in der Anwendung.
application.include_router(health_router)

# Diese Zeile registriert den Detection-Router in der Anwendung.
application.include_router(detect_router)