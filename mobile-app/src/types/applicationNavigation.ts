// Diese Zeile importiert die Hilfstypen für typisierte Screen-Eigenschaften.
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


// Diese Typdefinition beschreibt eine Bounding Box eines Verkehrszeichens.
export type TrafficSignBoundingBox = {
  // Diese Zeile definiert die linke X-Koordinate.
  xMin: number;
  // Diese Zeile definiert die obere Y-Koordinate.
  yMin: number;
  // Diese Zeile definiert die rechte X-Koordinate.
  xMax: number;
  // Diese Zeile definiert die untere Y-Koordinate.
  yMax: number;
};


// Diese Typdefinition beschreibt eine einzelne Erkennung.
export type TrafficSignDetection = {
  // Diese Zeile definiert die eindeutige Kennung der Erkennung.
  id: string;
  // Diese Zeile definiert das technische Label der Erkennung.
  label: string;
  // Diese Zeile definiert die Wahrscheinlichkeit der Erkennung.
  confidence: number;
  // Diese Zeile definiert die Bounding Box der Erkennung.
  boundingBox: TrafficSignBoundingBox;
};


// Diese Typdefinition beschreibt die Antwort des Backends.
export type DetectionApiResponse = {
  // Diese Zeile definiert die Liste aller Erkennungen.
  detections: TrafficSignDetection[];
  // Diese Zeile definiert die Breite des Ursprungsbildes.
  sourceImageWidth: number;
  // Diese Zeile definiert die Höhe des Ursprungsbildes.
  sourceImageHeight: number;
};


// Diese Typdefinition beschreibt alle erlaubten Navigationsparameter der Anwendung.
export type ApplicationStackParameterList = {
  // Diese Zeile definiert, dass der Startbildschirm keine Parameter erwartet.
  HomeScreen: undefined;

  // Diese Zeile definiert die Parameter für den Bildprüfungsbildschirm.
  ImageReviewScreen:
    // Diese Zeile erlaubt ein optionales Parameterobjekt.
    {
      // Diese Zeile definiert die Bildadresse als optionalen Wert.
      imageUri?: string;
    }
    // Diese Zeile erlaubt auch fehlende Parameter.
    | undefined;

  // Diese Zeile definiert die Parameter für den Ergebnisbildschirm.
  DetectionResultScreen: {
    // Diese Zeile definiert die Adresse des analysierten Bildes.
    imageUri: string;
    // Diese Zeile definiert die Breite des Ursprungsbildes.
    sourceImageWidth: number;
    // Diese Zeile definiert die Höhe des Ursprungsbildes.
    sourceImageHeight: number;
    // Diese Zeile definiert die Liste der Erkennungen.
    detections: TrafficSignDetection[];
  };

  // Diese Zeile definiert, dass der Verlaufsbildschirm keine Parameter erwartet.
  HistoryScreen: undefined;
};


// Diese Typdefinition beschreibt die Eigenschaften des Startbildschirms.
export type HomeScreenProperties = NativeStackScreenProps<ApplicationStackParameterList, 'HomeScreen'>;

// Diese Typdefinition beschreibt die Eigenschaften des Bildprüfungsbildschirms.
export type ImageReviewScreenProperties = NativeStackScreenProps<ApplicationStackParameterList, 'ImageReviewScreen'>;

// Diese Typdefinition beschreibt die Eigenschaften des Ergebnisbildschirms.
export type DetectionResultScreenProperties = NativeStackScreenProps<ApplicationStackParameterList, 'DetectionResultScreen'>;

// Diese Typdefinition beschreibt die Eigenschaften des Verlaufsbildschirms.
export type HistoryScreenProperties = NativeStackScreenProps<ApplicationStackParameterList, 'HistoryScreen'>;