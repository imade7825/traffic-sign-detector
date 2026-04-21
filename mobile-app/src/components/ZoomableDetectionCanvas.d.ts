// Diese Zeile importiert React-Typen für die Komponentenbeschreibung.
import React from 'react';

// Diese Zeile importiert den Detection-Typ der Anwendung.
import type { TrafficSignDetection } from '../types/applicationNavigation';


// Diese Typdefinition beschreibt die Eingaben der plattformabhängigen Canvas-Komponente.
export type ZoomableDetectionCanvasProperties = {
  // Diese Zeile definiert die Bildadresse.
  imageUri: string;

  // Diese Zeile definiert die Liste der Erkennungen.
  detections: TrafficSignDetection[];

  // Diese Zeile definiert die Breite des Ursprungsbildes.
  sourceImageWidth: number;

  // Diese Zeile definiert die Höhe des Ursprungsbildes.
  sourceImageHeight: number;
};


// Diese Zeile deklariert die plattformabhängige Canvas-Komponente für TypeScript.
export declare function ZoomableDetectionCanvas(
  // Diese Zeile beschreibt die Eigenschaften der Komponente.
  properties: ZoomableDetectionCanvasProperties
  // Diese Zeile definiert den JSX-Rückgabewert der Komponente.
): React.JSX.Element;