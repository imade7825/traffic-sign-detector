# Traffic Sign Detector Starter

Dieses Starterprojekt enthält eine mobile App mit Expo und ein Python-Backend mit FastAPI.
Die Quelltexte sind auf Englisch geschrieben.
In Dateien, die Kommentare unterstützen, stehen die Kommentare auf Deutsch **vor** der jeweiligen Codezeile.
`package.json` und andere reine JSON-Dateien können technisch keine Kommentare enthalten, damit sie gültig bleiben.

## Projektstruktur

```text
traffic-sign-detector-starter/
├── mobile-app/
│   ├── App.tsx
│   ├── app.config.ts
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── config/
│       ├── constants/
│       ├── navigation/
│       ├── screens/
│       ├── services/
│       └── types/
├── backend/
│   ├── requirements.txt
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── services/
│   └── models/
└── README.md
```

## Workflow: So arbeitet alles zusammen

```text
1. HomeScreen
   -> User tippt auf "Take Photo" oder "Pick Image"

2. imagePickerService
   -> App fragt Berechtigung an
   -> App öffnet Kamera oder Galerie
   -> App erhält imageUri

3. ImageReviewScreen
   -> App zeigt das ausgewählte Bild
   -> User tippt auf "Analyze Image"

4. detectionService
   -> App sendet das Bild als multipart/form-data an POST /detect

5. FastAPI Backend
   -> detection_route speichert die Datei temporär
   -> object_detection_service lädt YOLO, wenn Gewichte vorhanden sind
   -> Backend gibt detections + sourceImageWidth + sourceImageHeight zurück

6. Mobile App
   -> ImageReviewScreen speichert erfolgreiche Erkennungen lokal
   -> App navigiert zu DetectionResultScreen

7. DetectionResultScreen
   -> Bild wird angezeigt
   -> BoundingBoxOverlay zeichnet die Rechtecke
   -> DetectionResultCard zeigt Label, Confidence und Meaning

8. HistoryScreen
   -> historyService lädt gespeicherte Einträge aus AsyncStorage
   -> Verlauf wird nach neuestem Eintrag zuerst angezeigt
```

## Mobile App starten

### 1. In den Mobile-Ordner wechseln

```bash
# Dieser Schritt wechselt in den Mobile-App-Ordner.
cd mobile-app
```

### 2. Abhängigkeiten installieren

```bash
# Dieser Schritt installiert alle Node-Abhängigkeiten.
npm install
```

### 3. App starten

```bash
# Dieser Schritt startet die Expo-Entwicklungsumgebung.
npm run start
```

### 4. Android lokal ausführen

```bash
# Dieser Schritt baut und startet die Android-App lokal.
npm run android
```

## Backend starten

### 1. In den Backend-Ordner wechseln

```bash
# Dieser Schritt wechselt in den Backend-Ordner.
cd backend
```

### 2. Virtuelle Umgebung erstellen

```bash
# Dieser Schritt erstellt eine virtuelle Python-Umgebung.
python -m venv .venv
```

### 3. Virtuelle Umgebung aktivieren

```bash
# Dieser Schritt aktiviert die virtuelle Umgebung unter macOS oder Linux.
source .venv/bin/activate
```

```powershell
# Dieser Schritt aktiviert die virtuelle Umgebung unter Windows PowerShell.
.venv\Scripts\Activate.ps1
```

### 4. Python-Abhängigkeiten installieren

```bash
# Dieser Schritt installiert alle Backend-Abhängigkeiten.
pip install -r requirements.txt
```

### 5. Backend starten

```bash
# Dieser Schritt startet den FastAPI-Server lokal.
uvicorn app.main:application --reload
```

### 6. Health-Endpunkt testen

```bash
# Dieser Schritt ruft den Health-Endpunkt auf.
curl http://127.0.0.1:8000/health
```

## YOLO-Gewichte einbinden

Lege deine trainierte Gewichtedatei hier ab:

```text
backend/models/traffic_sign_detector.pt
```

Oder setze eine Umgebungsvariable:

```bash
# Dieser Schritt setzt den Pfad auf deine Gewichte.
export TRAFFIC_SIGN_MODEL_PATH=/dein/pfad/zum/modell.pt
```

Ohne Modellgewichte läuft das Backend trotzdem stabil und gibt aktuell eine leere Erkennungsliste zurück.
Dadurch funktionieren Navigation, Upload, Fehlerbehandlung, leere Zustände und Verlauf weiter sauber.

## Wichtige Hinweise für Emulator und Gerät

- Für den **Android Emulator** ist `http://10.0.2.2:8000` in `mobile-app/app.config.ts` richtig.
- Für ein **physisches Gerät** musst du dort die lokale IP-Adresse deines Rechners eintragen, zum Beispiel `http://192.168.1.10:8000`.

## Welche Stories bereits abgedeckt sind

- Mobile App initialisiert
- Backend initialisiert
- Navigation eingerichtet
- Foto aufnehmen
- Bild aus Galerie wählen
- Bild überprüfen
- Backend-Analyse aufrufen
- Bounding Boxes anzeigen
- Ergebnisse lokal speichern
- Verlauf anzeigen
