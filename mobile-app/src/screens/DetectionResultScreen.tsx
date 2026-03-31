// Diese Zeile importiert React, damit wir eine Funktionskomponente schreiben können.
import React from 'react';

// Diese Zeile importiert benötigte Bausteine aus React Native.
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// Diese Zeile importiert die Safe-Area-Ansicht.
import { SafeAreaView } from 'react-native-safe-area-context';

// Diese Zeile importiert die wiederverwendbare Informationskarte.
import { InformationCard } from '../components/InformationCard';

// Diese Zeile importiert den wiederverwendbaren Aktionsbutton.
import { ScreenActionButton } from '../components/ScreenActionButton';

// Diese Zeile importiert die Farbpalette der Anwendung.
import { colorPalette } from '../constants/colorPalette';

// Diese Zeile importiert die wiederverwendbaren Abstände und Größen.
import { layoutValues } from '../constants/layoutValues';

// Diese Zeile importiert die typisierten Eigenschaften des Ergebnisbildschirms.
import type { DetectionResultScreenProperties } from '../types/applicationNavigation';


// Diese Funktion rendert den Ergebnisbildschirm.
export function DetectionResultScreen({ navigation, route }: DetectionResultScreenProperties): React.JSX.Element {
  // Diese Zeile liest die Navigationsparameter aus.
  const { imageUri, sourceImageWidth, sourceImageHeight, detections } = route.params;

  // Diese Funktion öffnet den Verlaufsbildschirm.
  function handleOpenHistoryScreen(): void {
    // Diese Zeile navigiert zum Verlaufsbildschirm.
    navigation.navigate('HistoryScreen');
  }

  // Diese Funktion navigiert zurück zum Startbildschirm.
  function handleOpenHomeScreen(): void {
    // Diese Zeile navigiert zum Startbildschirm.
    navigation.navigate('HomeScreen');
  }

  // Diese Zeile gibt die gesamte Benutzeroberfläche des Ergebnisbildschirms zurück.
  return (
    // Diese Zeile sorgt dafür, dass der Bildschirm die sicheren Ränder des Geräts beachtet.
    <SafeAreaView style={styles.safeArea}>
      {/* Diese Zeile rendert den scrollbaren Inhalt. */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Diese Zeile rendert den oberen Kopfbereich. */}
        <View style={styles.headerSection}>
          {/* Diese Zeile zeigt die Überschrift des Bildschirms an. */}
          <Text style={styles.screenTitle}>Detection Result Screen</Text>

          {/* Diese Zeile beschreibt den Bildschirm kurz. */}
          <Text style={styles.screenDescription}>
            The backend analysis result is shown on this screen.
          </Text>
        </View>

        {/* Diese Zeile rendert den Bildbereich. */}
        <View style={styles.imagePreviewContainer}>
          {/* Diese Zeile zeigt das analysierte Bild an. */}
          <Image
            // Diese Zeile setzt die Bildquelle.
            source={{ uri: imageUri }}
            // Diese Zeile setzt den Stil des Bildes.
            style={styles.imagePreview}
            // Diese Zeile sorgt dafür, dass das Bild nicht verzerrt wird.
            resizeMode="contain"
          />
        </View>

        {/* Diese Zeile zeigt die Ursprungsgröße des Bildes an. */}
        <InformationCard
          // Diese Zeile setzt den Titel der Karte.
          title="Source image size"
          // Diese Zeile setzt die Beschreibung der Karte.
          description={`${sourceImageWidth} x ${sourceImageHeight}`}
        />

        {/* Diese Zeile prüft, ob keine Erkennungen vorhanden sind. */}
        {detections.length === 0 ? (
          <>
            {/* Diese Zeile zeigt den Empty State an. */}
            <InformationCard
              // Diese Zeile setzt den Titel der Karte.
              title="No detections"
              // Diese Zeile setzt die Beschreibung der Karte.
              description="No traffic signs detected in the selected image."
            />
          </>
        ) : (
          <>
            {/* Diese Zeile zeigt den Abschnittstitel an. */}
            <Text style={styles.sectionTitle}>Detected objects</Text>

            {/* Diese Zeile rendert für jede Erkennung eine Karte. */}
            {detections.map((trafficSignDetection) => (
              <InformationCard
                // Diese Zeile setzt den eindeutigen Schlüssel der Karte.
                key={trafficSignDetection.id}
                // Diese Zeile setzt den Titel der Karte.
                title={`${trafficSignDetection.label} (${Math.round(trafficSignDetection.confidence * 100)}%)`}
                // Diese Zeile setzt die Beschreibung der Karte.
                description={`Bounding box: ${Math.round(trafficSignDetection.boundingBox.xMin)}, ${Math.round(trafficSignDetection.boundingBox.yMin)}, ${Math.round(trafficSignDetection.boundingBox.xMax)}, ${Math.round(trafficSignDetection.boundingBox.yMax)}`}
              />
            ))}
          </>
        )}

        {/* Diese Zeile rendert den Button zum Verlaufsbildschirm. */}
        <ScreenActionButton
          // Diese Zeile setzt den sichtbaren Text des Buttons.
          title="Open History Screen"
          // Diese Zeile verbindet den Button mit der Navigationsfunktion.
          onPress={handleOpenHistoryScreen}
        />

        {/* Diese Zeile rendert den Button zurück zum Startbildschirm. */}
        <ScreenActionButton
          // Diese Zeile setzt den sichtbaren Text des Buttons.
          title="Back to Home Screen"
          // Diese Zeile verbindet den Button mit der Navigationsfunktion.
          onPress={handleOpenHomeScreen}
        />
      </ScrollView>
    </SafeAreaView>
  );
}


// Diese Konstante enthält alle Styles des Bildschirms.
const styles = StyleSheet.create({
  // Diese Regel gestaltet die sichere äußere Fläche des Bildschirms.
  safeArea: {
    // Diese Zeile setzt die Haupt-Hintergrundfarbe.
    backgroundColor: colorPalette.backgroundPrimary,
    // Diese Zeile lässt die Fläche den ganzen Bildschirm füllen.
    flex: 1
  },

  // Diese Regel gestaltet den inneren Abstand des scrollbaren Inhalts.
  scrollContent: {
    // Diese Zeile erzeugt oberen Abstand.
    paddingTop: layoutValues.large,
    // Diese Zeile erzeugt horizontalen Abstand.
    paddingHorizontal: layoutValues.large,
    // Diese Zeile erzeugt unteren Abstand.
    paddingBottom: layoutValues.extraLarge
  },

  // Diese Regel gestaltet den oberen Einführungsbereich.
  headerSection: {
    // Diese Zeile setzt die Hintergrundfarbe des Bereichs.
    backgroundColor: colorPalette.surfacePrimary,
    // Diese Zeile erzeugt Innenabstand.
    padding: layoutValues.large,
    // Diese Zeile rundet die Ecken weich ab.
    borderRadius: layoutValues.cardRadius,
    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.large,
    // Diese Zeile zeichnet einen feinen Rand.
    borderWidth: 1,
    // Diese Zeile setzt die Randfarbe.
    borderColor: colorPalette.borderPrimary
  },

  // Diese Regel gestaltet die Hauptüberschrift.
  screenTitle: {
    // Diese Zeile setzt eine große Schriftgröße.
    fontSize: 28,
    // Diese Zeile macht die Überschrift deutlich fett.
    fontWeight: '700',
    // Diese Zeile setzt die Haupttextfarbe.
    color: colorPalette.textPrimary,
    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.small
  },

  // Diese Regel gestaltet die erklärende Beschreibung.
  screenDescription: {
    // Diese Zeile setzt die Schriftgröße der Beschreibung.
    fontSize: 16,
    // Diese Zeile setzt die weichere Textfarbe.
    color: colorPalette.textSecondary,
    // Diese Zeile erhöht die Lesbarkeit durch mehr Zeilenhöhe.
    lineHeight: 24
  },

  // Diese Regel gestaltet den Bildbereich.
  imagePreviewContainer: {
    // Diese Zeile setzt die Hintergrundfarbe des Vorschaubereichs.
    backgroundColor: colorPalette.surfacePrimary,
    // Diese Zeile erzeugt Innenabstand.
    padding: layoutValues.medium,
    // Diese Zeile rundet die Ecken weich ab.
    borderRadius: layoutValues.cardRadius,
    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.large,
    // Diese Zeile zeichnet einen feinen Rand.
    borderWidth: 1,
    // Diese Zeile setzt die Randfarbe.
    borderColor: colorPalette.borderPrimary,
    // Diese Zeile legt eine feste Höhe für die Vorschau fest.
    height: 260
  },

  // Diese Regel gestaltet das Bild in der Vorschau.
  imagePreview: {
    // Diese Zeile setzt die Breite auf die volle Containerbreite.
    width: '100%',
    // Diese Zeile setzt die Höhe auf die volle Containerhöhe.
    height: '100%'
  },

  // Diese Regel gestaltet einen Abschnittstitel.
  sectionTitle: {
    // Diese Zeile setzt die Schriftgröße.
    fontSize: 20,
    // Diese Zeile macht den Text fett.
    fontWeight: '700',
    // Diese Zeile setzt die Haupttextfarbe.
    color: colorPalette.textPrimary,
    // Diese Zeile erzeugt Abstand oberhalb.
    marginTop: layoutValues.medium,
    // Diese Zeile erzeugt Abstand unterhalb.
    marginBottom: layoutValues.medium
  }
});