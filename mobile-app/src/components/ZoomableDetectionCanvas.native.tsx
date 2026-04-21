// Diese Zeile importiert React, damit wir eine Komponente definieren können.
import React from 'react';

// Diese Zeile importiert Bausteine aus React Native.
import { Image, LayoutChangeEvent, ScrollView, StyleSheet, Text, View } from 'react-native';

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


// Diese Funktion rendert die native Detection-Ansicht mit Bild und Infobox.
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

  // Diese Zeile berechnet den gemeinsamen Skalierungsfaktor für das Bild.
  const imageScale =
    viewportWidth > 0 && viewportHeight > 0
      ? Math.min(
          viewportWidth / properties.sourceImageWidth,
          viewportHeight / properties.sourceImageHeight
        )
      : 0;

  // Diese Zeile berechnet die sichtbare Breite der echten Bildfläche.
  const displayedImageWidth = properties.sourceImageWidth * imageScale;

  // Diese Zeile berechnet die sichtbare Höhe der echten Bildfläche.
  const displayedImageHeight = properties.sourceImageHeight * imageScale;

  // Diese Zeile prüft, ob mindestens eine Erkennung vorhanden ist.
  const hasDetections = properties.detections.length > 0;

  // Diese Zeile gibt die native Detection-Ansicht zurück.
  return (
    // Diese Zeile rendert den äußeren sichtbaren Bereich.
    <View onLayout={handleViewportLayout} style={styles.viewportContainer}>
      {/* Diese Zeile rendert einen scrollbaren Bereich für großes Bildmaterial. */}
      <ScrollView
        // Diese Zeile erlaubt horizontales Verschieben.
        horizontal={true}
        // Diese Zeile blendet die horizontale Scrollbar aus.
        showsHorizontalScrollIndicator={false}
        // Diese Zeile setzt den Stil des Scrollbereichs.
        contentContainerStyle={styles.scrollContentContainer}
      >
        {/* Diese Zeile rendert die echte Bildfläche. */}
        <View
          style={[
            styles.imageCanvas,
            {
              width: displayedImageWidth,
              height: displayedImageHeight
            }
          ]}
        >
          {/* Diese Zeile rendert das Bild selbst. */}
          <Image
            // Diese Zeile übergibt die Bildadresse.
            source={{ uri: properties.imageUri }}
            // Diese Zeile setzt den Stil des Bildes.
            style={styles.imagePreview}
            // Diese Zeile sorgt dafür, dass das Bild vollständig sichtbar bleibt.
            resizeMode="contain"
          />

          {/* Diese Zeile rendert das gelbe Infopanel links unten direkt auf dem Bild. */}
          <View style={styles.detectedSignsPanel}>
            {/* Diese Zeile zeigt die Überschrift des Panels an. */}
            <Text style={styles.detectedSignsPanelTitle}>Detected signs</Text>

            {/* Diese Zeile prüft, ob Erkennungen vorhanden sind. */}
            {hasDetections ? (
              <>
                {/* Diese Zeile rendert jeden erkannten Schildnamen als Eintrag. */}
                {properties.detections.map((trafficSignDetection) => (
                  // Diese Zeile rendert den Text des aktuellen Schildnamens.
                  <Text
                    // Diese Zeile setzt den eindeutigen Schlüssel.
                    key={trafficSignDetection.id}
                    // Diese Zeile begrenzt jeden Eintrag auf eine Zeile.
                    numberOfLines={1}
                    // Diese Zeile setzt den Stil des Eintrags.
                    style={styles.detectedSignsPanelItem}
                  >
                    {/* Diese Zeile zeigt den Namen des Schilds an. */}
                    • {trafficSignDetection.label}
                  </Text>
                ))}
              </>
            ) : (
              <>
                {/* Diese Zeile rendert den Text für den leeren Zustand. */}
                <Text style={styles.detectedSignsPanelItem}>
                  No traffic sign detected.
                </Text>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


// Diese Konstante enthält alle Styles der nativen Detection-Ansicht.
const styles = StyleSheet.create({
  // Diese Regel gestaltet den sichtbaren Viewport.
  viewportContainer: {
    // Diese Zeile setzt die Breite auf die volle verfügbare Breite.
    width: '100%',

    // Diese Zeile setzt die Höhe auf die volle verfügbare Höhe.
    height: '100%'
  },

  // Diese Regel gestaltet den Inhalt des Scrollbereichs.
  scrollContentContainer: {
    // Diese Zeile lässt den Inhalt die volle Mindesthöhe einnehmen.
    minHeight: '100%',

    // Diese Zeile richtet den Inhalt horizontal mittig aus.
    justifyContent: 'center',

    // Diese Zeile richtet den Inhalt vertikal mittig aus.
    alignItems: 'center'
  },

  // Diese Regel gestaltet die echte Bildfläche.
  imageCanvas: {
    // Diese Zeile positioniert Kind-Elemente relativ zur Bildfläche.
    position: 'relative'
  },

  // Diese Regel gestaltet das Bild.
  imagePreview: {
    // Diese Zeile setzt die Breite auf die volle Bildflächenbreite.
    width: '100%',

    // Diese Zeile setzt die Höhe auf die volle Bildflächenhöhe.
    height: '100%'
  },

  // Diese Regel gestaltet das gelbe Infopanel links unten im Bild.
  detectedSignsPanel: {
    // Diese Zeile positioniert das Panel absolut innerhalb des Bildes.
    position: 'absolute',

    // Diese Zeile setzt den linken Abstand.
    left: 12,

    // Diese Zeile setzt den unteren Abstand.
    bottom: 12,

    // Diese Zeile begrenzt die Breite des Panels sinnvoll.
    maxWidth: '72%',

    // Diese Zeile setzt die gelbe Hintergrundfarbe.
    backgroundColor: '#FFD54F',

    // Diese Zeile zeichnet einen feinen dunkleren Rand.
    borderWidth: 1,

    // Diese Zeile setzt die Randfarbe.
    borderColor: '#C89F00',

    // Diese Zeile rundet die Ecken weich ab.
    borderRadius: 10,

    // Diese Zeile setzt horizontalen Innenabstand.
    paddingHorizontal: 12,

    // Diese Zeile setzt vertikalen Innenabstand.
    paddingVertical: 10
  },

  // Diese Regel gestaltet die Überschrift des Panels.
  detectedSignsPanelTitle: {
    // Diese Zeile setzt die Textfarbe.
    color: '#1B1B1B',

    // Diese Zeile setzt die Schriftgröße.
    fontSize: 13,

    // Diese Zeile macht die Überschrift fett.
    fontWeight: '700',

    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: 6
  },

  // Diese Regel gestaltet jeden Eintrag im Panel.
  detectedSignsPanelItem: {
    // Diese Zeile setzt die Textfarbe.
    color: '#1B1B1B',

    // Diese Zeile setzt die Schriftgröße.
    fontSize: 12,

    // Diese Zeile macht den Text gut lesbar.
    fontWeight: '600',

    // Diese Zeile erzeugt kleinen Abstand nach unten.
    marginBottom: 2
  }
});