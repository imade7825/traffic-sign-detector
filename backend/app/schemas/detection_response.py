# Diese Zeile importiert die Basisklasse für Antwortmodelle.
from pydantic import BaseModel


# Diese Zeile definiert die Struktur einer Bounding Box.
class BoundingBoxResponse(BaseModel):
    # Diese Zeile definiert die linke X-Koordinate.
    xMin: float

    # Diese Zeile definiert die obere Y-Koordinate.
    yMin: float

    # Diese Zeile definiert die rechte X-Koordinate.
    xMax: float

    # Diese Zeile definiert die untere Y-Koordinate.
    yMax: float


# Diese Zeile definiert die Struktur einer einzelnen Erkennung.
class DetectionItemResponse(BaseModel):
    # Diese Zeile definiert die eindeutige Kennung der Erkennung.
    id: str

    # Diese Zeile definiert das technische Label der Erkennung.
    label: str

    # Diese Zeile definiert die Wahrscheinlichkeit der Erkennung.
    confidence: float

    # Diese Zeile definiert die Bounding Box der Erkennung.
    boundingBox: BoundingBoxResponse


# Diese Zeile definiert die vollständige API-Antwort für die Bildanalyse.
class DetectionResponse(BaseModel):
    # Diese Zeile definiert die Liste aller Erkennungen.
    detections: list[DetectionItemResponse]

    # Diese Zeile definiert die Breite des Ursprungsbildes.
    sourceImageWidth: int

    # Diese Zeile definiert die Höhe des Ursprungsbildes.
    sourceImageHeight: int