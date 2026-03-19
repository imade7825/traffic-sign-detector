// Diese Zeile importiert die Hilfstypen für typisierte Screen-Eigenschaften.
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


// Diese Typdefinition beschreibt eine einfache Vorschau auf eine erkannte Verkehrszeichen-Erkennung.
export type TrafficSignDetectionPreview = {
  // Diese Zeile definiert eine eindeutige Kennung der Erkennung.
  id: string;
  // Diese Zeile definiert das technische Label der Erkennung.
  label: string;
  // Diese Zeile definiert die Wahrscheinlichkeit der Erkennung.
  confidence: number;
  // Diese Zeile definiert die verständliche Bedeutung des Verkehrszeichens.
  meaning: string;
};


// Diese Typdefinition beschreibt alle erlaubten Navigationsparameter der Anwendung.
export type ApplicationStackParameterList = {
  // Diese Zeile definiert, dass der Startbildschirm keine Parameter erwartet.
  HomeScreen: undefined;
  // Diese Zeile definiert die Parameter für den Bildprüfungsbildschirm.
  ImageReviewScreen: {
    // Diese Zeile definiert den Pfad oder die Adresse des ausgewählten Bildes.
    imageUri: string;
  };
  // Diese Zeile definiert die Parameter für den Ergebnisbildschirm.
  DetectionResultScreen: {
    // Diese Zeile definiert den Pfad oder die Adresse des analysierten Bildes.
    imageUri: string;
    // Diese Zeile definiert die Breite des Ursprungsbildes.
    sourceImageWidth: number;
    // Diese Zeile definiert die Höhe des Ursprungsbildes.
    sourceImageHeight: number;
    // Diese Zeile definiert die Liste der Erkennungsvorschauen.
    detections: TrafficSignDetectionPreview[];
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