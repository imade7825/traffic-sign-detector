# Diese Zeile importiert Funktionen für Umgebungsvariablen.
import os

# Diese Zeile importiert einen Cache-Helfer für das einmalige Laden des Modells.
from functools import lru_cache

# Diese Zeile importiert den Pfadtyp.
from pathlib import Path

# Diese Zeile importiert Pillow zum Lesen der Bildgröße.
from PIL import Image

# Diese Zeile importiert die YOLO-Klasse von Ultralytics.
from ultralytics import YOLO

# Diese Zeile importiert die Antwortmodelle der Detection-API.
from app.schemas.detection_response import BoundingBoxResponse, DetectionItemResponse, DetectionResponse

# Diese Zeile importiert optionale Typen für Python 3.9.
from typing import Optional


# Diese Konstante definiert den Standardpfad für die Modellgewichte.
DEFAULT_MODEL_PATH = Path(__file__).resolve().parents[2] / 'models' / 'traffic_sign_detector.pt'


# Diese Funktion lädt das YOLO-Modell einmalig und cached es.
@lru_cache(maxsize=1)
def load_traffic_sign_model() -> Optional[YOLO]:
    # Diese Zeile liest optional einen Modellpfad aus der Umgebungsvariable.
    configured_model_path = os.getenv('TRAFFIC_SIGN_MODEL_PATH')

    # Diese Zeile entscheidet, welcher Modellpfad verwendet werden soll.
    model_path = Path(configured_model_path) if configured_model_path else DEFAULT_MODEL_PATH

    # Diese Zeile prüft, ob die Gewichtsdatei existiert.
    if not model_path.exists():
        # Diese Zeile gibt kein Modell zurück, wenn keine Gewichte vorhanden sind.
        return None

    # Diese Zeile lädt das YOLO-Modell aus der Gewichtsdatei.
    return YOLO(str(model_path))


# Diese Funktion erstellt eine leere Detection-Antwort.
def create_empty_detection_response(source_image_width: int, source_image_height: int) -> DetectionResponse:
    # Diese Zeile gibt eine Antwort ohne Erkennungen zurück.
    return DetectionResponse(
        detections=[],
        sourceImageWidth=source_image_width,
        sourceImageHeight=source_image_height
    )


# Diese Funktion analysiert ein Bild und wandelt das Ergebnis in App-JSON um.
def analyze_image_file(image_path: str) -> DetectionResponse:
    # Diese Zeile öffnet das Ursprungsbild zur Größenbestimmung.
    with Image.open(image_path) as source_image:
        # Diese Zeile liest die Bildbreite und Bildhöhe aus.
        source_image_width, source_image_height = source_image.size

    # Diese Zeile lädt das YOLO-Modell.
    detection_model = load_traffic_sign_model()

    # Diese Zeile prüft, ob Modellgewichte vorhanden sind.
    if detection_model is None:
        # Diese Zeile gibt eine leere Antwort zurück, wenn kein Modell vorhanden ist.
        return create_empty_detection_response(source_image_width, source_image_height)

    # Diese Zeile führt die Inferenz auf dem Bild aus.
    inference_results = detection_model.predict(
    source=image_path,
    conf=0.5,
    iou=0.2,
    max_det=4,
    verbose=False
)

    # Diese Zeile liest das erste Ergebnisobjekt aus.
    first_result = inference_results[0]

    # Diese Zeile prüft, ob Bounding Boxes vorhanden sind.
    if first_result.boxes is None or len(first_result.boxes) == 0:
        # Diese Zeile gibt eine leere Antwort zurück, wenn nichts erkannt wurde.
        return create_empty_detection_response(source_image_width, source_image_height)

    # Diese Zeile liest die Klassennamen des Modells.
    class_name_by_index = detection_model.names

    # Diese Zeile liest die Bounding Boxes als Listen im XYXY-Format.
    bounding_box_values = first_result.boxes.xyxy.cpu().tolist()

    # Diese Zeile liest die Confidence-Werte als Liste.
    confidence_values = first_result.boxes.conf.cpu().tolist()

    # Diese Zeile liest die Klassenindizes als Liste.
    class_index_values = first_result.boxes.cls.cpu().tolist()

    # Diese Zeile bereitet die Ergebnisliste vor.
    detection_items: list[DetectionItemResponse] = []

    # Diese Zeile iteriert über alle erkannten Bounding Boxes.
    for detection_index, current_bounding_box in enumerate(bounding_box_values):
        # Diese Zeile liest den Klassenindex der aktuellen Erkennung.
        class_index = int(class_index_values[detection_index])

        # Diese Zeile bestimmt das Label der aktuellen Erkennung.
        label = class_name_by_index.get(class_index, f'class_{class_index}')

        # Diese Zeile liest die Confidence der aktuellen Erkennung.
        confidence = float(confidence_values[detection_index])

        # Diese Zeile erstellt das Antwortobjekt für die aktuelle Erkennung.
        detection_item = DetectionItemResponse(
            id=f'detection-{detection_index + 1}',
            label=label,
            confidence=confidence,
            boundingBox=BoundingBoxResponse(
                xMin=float(current_bounding_box[0]),
                yMin=float(current_bounding_box[1]),
                xMax=float(current_bounding_box[2]),
                yMax=float(current_bounding_box[3])
            )
        )

        # Diese Zeile fügt die aktuelle Erkennung zur Ergebnisliste hinzu.
        detection_items.append(detection_item)

    # Diese Zeile gibt die vollständige Detection-Antwort zurück.
    return DetectionResponse(
        detections=detection_items,
        sourceImageWidth=source_image_width,
        sourceImageHeight=source_image_height
    )