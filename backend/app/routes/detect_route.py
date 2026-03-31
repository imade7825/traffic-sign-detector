# Diese Zeile importiert Hilfen zum Kopieren von Dateiinhalten.
import shutil

# Diese Zeile importiert einen Pfadtyp.
from pathlib import Path

# Diese Zeile importiert temporäre Dateien.
from tempfile import NamedTemporaryFile

# Diese Zeile importiert FastAPI-Bausteine für Router und Datei-Upload.
from fastapi import APIRouter, File, UploadFile

# Diese Zeile importiert das Antwortmodell der Detection-API.
from app.schemas.detection_response import DetectionResponse

# Diese Zeile importiert den YOLO-Service.
from app.services.object_detection_service import analyze_image_file


# Diese Zeile erstellt den Router für Detection-Endpunkte.
detect_router = APIRouter(tags=['detection'])


# Diese Zeile verbindet die Funktion mit der HTTP-POST-Route /detect.
@detect_router.post('/detect', response_model=DetectionResponse)
# Diese Funktion nimmt ein Bild entgegen und analysiert es.
async def detect_traffic_signs(file: UploadFile = File(...)) -> DetectionResponse:
    # Diese Zeile liest die Dateiendung der hochgeladenen Datei.
    original_suffix = Path(file.filename or 'upload.jpg').suffix or '.jpg'

    # Diese Zeile erstellt eine temporäre Datei für das Bild.
    with NamedTemporaryFile(delete=False, suffix=original_suffix) as temporary_file:
        # Diese Zeile speichert den Pfad der temporären Datei.
        temporary_image_path = Path(temporary_file.name)

        # Diese Zeile kopiert den Upload-Inhalt in die temporäre Datei.
        shutil.copyfileobj(file.file, temporary_file)

    # Diese Zeile startet einen Fehler-sicheren Block für Analyse und Aufräumen.
    try:
        # Diese Zeile analysiert die temporär gespeicherte Datei.
        detection_response = analyze_image_file(str(temporary_image_path))

        # Diese Zeile gibt die API-Antwort zurück.
        return detection_response
    finally:
        # Diese Zeile schließt das Upload-Objekt.
        await file.close()

        # Diese Zeile löscht die temporäre Datei nach der Analyse.
        temporary_image_path.unlink(missing_ok=True)