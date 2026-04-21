// Diese Zeile importiert React, damit wir eine Komponente definieren können.
import React from 'react';

// Diese Zeile importiert Bausteine aus React Native.
import { Image, LayoutChangeEvent, StyleSheet, View } from 'react-native';

// Diese Zeile importiert das Bounding-Box-Overlay.
import { BoundingBoxOverlay } from './BoundingBoxOverlay';

// Diese Zeile importiert den Typ für die Erkennungen.
import type { TrafficSignDetection } from '../types/applicationNavigation';


// Diese Typdefinition beschreibt die Eingaben für die Detection-Ansicht.
type ZoomableDetectionCanvasProperties = {
  // Diese Zeile definiert die Bildadresse.
  imageUri: string;

  // Diese Zeile definiert die Liste der Erkennungen.
  detections: TrafficSignDetection[];

  // Diese Zeile definiert die Breite des Ursprungsbildes.
  sourceImageWidth: number;

  // Diese Zeile definiert die Höhe des Ursprungsbildes.
  sourceImageHeight: number;
};


// Diese Funktion rendert die Web-Version der Detection-Ansicht.
export function ZoomableDetectionCanvas(
  properties: ZoomableDetectionCanvasProperties
): React.JSX.Element {
  // Diese Zeile speichert die Breite des sichtbaren Containers.
  const [viewportWidth, setViewportWidth] = React.useState(0);

  // Diese Zeile speichert die Höhe des sichtbaren Containers.
  const [viewportHeight, setViewportHeight] = React.useState(0);

  // Diese Funktion liest die Größe des sichtbaren Viewports aus.
  function handleViewportLayout(event: LayoutChangeEvent): void {
    // Diese Zeile liest Breite und Höhe aus dem Layout-Ereignis.
    const { width, height } = event.nativeEvent.layout;

    // Diese Zeile speichert die Breite des Viewports.
    setViewportWidth(width);

    // Diese Zeile speichert die Höhe des Viewports.
    setViewportHeight(height);
  }

  // Diese Zeile berechnet die sichtbare Breite der echten Bildfläche im contain-layout.
  const displayedImageWidth =
    viewportWidth > 0 && viewportHeight > 0
      ? properties.sourceImageWidth *
        Math.min(
          viewportWidth / properties.sourceImageWidth,
          viewportHeight / properties.sourceImageHeight
        )
      : 0;

  // Diese Zeile berechnet die sichtbare Höhe der echten Bildfläche im contain-layout.
  const displayedImageHeight =
    viewportWidth > 0 && viewportHeight > 0
      ? properties.sourceImageHeight *
        Math.min(
          viewportWidth / properties.sourceImageWidth,
          viewportHeight / properties.sourceImageHeight
        )
      : 0;

  // Diese Zeile gibt die Web-Ansicht zurück.
  return (
    <View onLayout={handleViewportLayout} style={styles.viewportContainer}>
      <View style={styles.centerLayer}>
        <View
          style={[
            styles.imageCanvas,
            {
              width: displayedImageWidth,
              height: displayedImageHeight
            }
          ]}
        >
          <Image
            source={{ uri: properties.imageUri }}
            style={styles.imagePreview}
            resizeMode="stretch"
          />

          <BoundingBoxOverlay
            detections={properties.detections}
            sourceImageWidth={properties.sourceImageWidth}
            sourceImageHeight={properties.sourceImageHeight}
            canvasWidth={displayedImageWidth}
            canvasHeight={displayedImageHeight}
          />
        </View>
      </View>
    </View>
  );
}


// Diese Konstante enthält alle Styles der Web-Version.
const styles = StyleSheet.create({
  // Diese Regel gestaltet den sichtbaren Viewport.
  viewportContainer: {
    width: '100%',
    height: '100%'
  },

  // Diese Regel zentriert die Bildfläche.
  centerLayer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Diese Regel gestaltet die echte Bildfläche.
  imageCanvas: {
    position: 'relative'
  },

  // Diese Regel gestaltet das Bild.
  imagePreview: {
    width: '100%',
    height: '100%'
  }
});