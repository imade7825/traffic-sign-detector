// Diese Zeile importiert React, damit wir eine Funktionskomponente schreiben können.
import React from 'react';

// Diese Zeile importiert benötigte Bausteine aus React Native.
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Diese Zeile importiert die Safe-Area-Ansicht.
import { SafeAreaView } from 'react-native-safe-area-context';

// Diese Zeile importiert die Ergebnis-Karte.
import { DetectionResultCard } from '../components/DetectionResultCard';

// Diese Zeile importiert die plattformabhängige zoombare Detection-Ansicht.
import { ZoomableDetectionCanvas } from '../components/ZoomableDetectionCanvas';

// Diese Zeile importiert die Farbpalette der Anwendung.
import { colorPalette } from '../constants/colorPalette';

// Diese Zeile importiert die lokale Verkehrszeicheninformation.
import { readTrafficSignMeaning } from '../constants/trafficSignInformation';

// Diese Zeile importiert die wiederverwendbaren Abstände und Größen.
import { layoutValues } from '../constants/layoutValues';

// Diese Zeile importiert den wiederverwendbaren Aktionsbutton.
import { ScreenActionButton } from '../components/ScreenActionButton';

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
            The analyzed image, bounding boxes and detected traffic signs are shown here.
          </Text>
        </View>

        {/* Diese Zeile rendert den Bildbereich mit gemeinsamem Zoom und Verschieben. */}
        <View style={styles.imagePreviewContainer}>
          {/* Diese Zeile rendert die plattformabhängige Canvas-Komponente. */}
          <ZoomableDetectionCanvas
            // Diese Zeile übergibt die Bildadresse.
            imageUri={imageUri}
            // Diese Zeile übergibt die Erkennungen.
            detections={detections}
            // Diese Zeile übergibt die Breite des Ursprungsbildes.
            sourceImageWidth={sourceImageWidth}
            // Diese Zeile übergibt die Höhe des Ursprungsbildes.
            sourceImageHeight={sourceImageHeight}
          />
        </View>

        {/* Diese Zeile zeigt die Ursprungsgröße des Bildes an. */}
        <View style={styles.imageMetaCard}>
          {/* Diese Zeile zeigt den Metatitel an. */}
          <Text style={styles.imageMetaTitle}>Source image size</Text>

          {/* Diese Zeile zeigt die Bildmaße an. */}
          <Text style={styles.imageMetaValue}>
            {sourceImageWidth} x {sourceImageHeight}
          </Text>
        </View>

        {/* Diese Zeile prüft, ob keine Erkennungen vorhanden sind. */}
        {detections.length === 0 ? (
          <>
            {/* Diese Zeile rendert den leeren Zustand. */}
            <View style={styles.emptyStateContainer}>
              {/* Diese Zeile zeigt den exakt geforderten leeren Zustandstext an. */}
              <Text style={styles.emptyStateText}>No traffic sign detected.</Text>
            </View>
          </>
        ) : (
          <>
            {/* Diese Zeile zeigt den Abschnittstitel für die Erkennungen an. */}
            <Text style={styles.sectionTitle}>Detected traffic signs</Text>

            {/* Diese Zeile rendert für jede Erkennung eine Ergebnis-Karte. */}
            {detections.map((trafficSignDetection) => (
              <DetectionResultCard
                // Diese Zeile setzt den eindeutigen Schlüssel.
                key={trafficSignDetection.id}
                // Diese Zeile übergibt das Label.
                label={trafficSignDetection.label}
                // Diese Zeile übergibt die Wahrscheinlichkeit.
                confidence={trafficSignDetection.confidence}
                // Diese Zeile übergibt die lokale Bedeutung.
                meaning={readTrafficSignMeaning(trafficSignDetection.label)}
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

    // Diese Zeile rundet die Ecken weich ab.
    borderRadius: layoutValues.cardRadius,

    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.large,

    // Diese Zeile zeichnet einen feinen Rand.
    borderWidth: 1,

    // Diese Zeile setzt die Randfarbe.
    borderColor: colorPalette.borderPrimary,

    // Diese Zeile legt eine größere feste Höhe fest.
    height: 420,

    // Diese Zeile schneidet Inhalte außerhalb des Bereichs ab.
    overflow: 'hidden'
  },

  // Diese Regel gestaltet die Metadaten-Karte.
  imageMetaCard: {
    // Diese Zeile setzt die Hintergrundfarbe der Karte.
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

  // Diese Regel gestaltet den Titel der Metadaten-Karte.
  imageMetaTitle: {
    // Diese Zeile setzt die Schriftgröße.
    fontSize: 16,

    // Diese Zeile macht den Titel fett.
    fontWeight: '700',

    // Diese Zeile setzt die Haupttextfarbe.
    color: colorPalette.textPrimary,

    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.small
  },

  // Diese Regel gestaltet den Wert der Metadaten-Karte.
  imageMetaValue: {
    // Diese Zeile setzt die Schriftgröße.
    fontSize: 15,

    // Diese Zeile setzt die weichere Textfarbe.
    color: colorPalette.textSecondary
  },

  // Diese Regel gestaltet den Abschnittstitel.
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
  },

  // Diese Regel gestaltet den leeren Zustand.
  emptyStateContainer: {
    // Diese Zeile setzt die Hintergrundfarbe.
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
    borderColor: colorPalette.borderPrimary,

    // Diese Zeile richtet den Inhalt mittig aus.
    alignItems: 'center'
  },

  // Diese Regel gestaltet den leeren Zustandstext.
  emptyStateText: {
    // Diese Zeile setzt die Schriftgröße.
    fontSize: 18,

    // Diese Zeile macht den Text gut lesbar.
    fontWeight: '600',

    // Diese Zeile setzt die Haupttextfarbe.
    color: colorPalette.textPrimary,

    // Diese Zeile richtet den Text mittig aus.
    textAlign: 'center'
  }
});