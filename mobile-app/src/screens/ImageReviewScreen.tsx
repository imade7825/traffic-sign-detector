// Diese Zeile importiert React, damit wir eine Funktionskomponente schreiben können.
import React from 'react';

// Diese Zeile importiert die benötigten Bausteine aus React Native.
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

// Diese Zeile importiert die Safe-Area-Ansicht.
import { SafeAreaView } from 'react-native-safe-area-context';

// Diese Zeile importiert den wiederverwendbaren Aktionsbutton.
import { ScreenActionButton } from '../components/ScreenActionButton';

// Diese Zeile importiert die zoombare Bildkomponente.
import { ZoomableImagePreview } from '../components/ZoomableImagePreview';

// Diese Zeile importiert die Farbpalette der Anwendung.
import { colorPalette } from '../constants/colorPalette';

// Diese Zeile importiert die wiederverwendbaren Abstände und Größen.
import { layoutValues } from '../constants/layoutValues';

// Diese Zeile importiert die typisierten Eigenschaften des Bildprüfungsbildschirms.
import type {
  ImageReviewScreenProperties,
  TrafficSignDetectionPreview
} from '../types/applicationNavigation';


// Diese Funktion rendert den Bildprüfungsbildschirm.
export function ImageReviewScreen({ navigation, route }: ImageReviewScreenProperties): React.JSX.Element {
  // Diese Zeile liest die Bildadresse sicher aus den Navigationsparametern.
  const selectedImageUri = route.params?.imageUri;

  // Diese Zeile prüft, ob eine nutzbare Bildadresse vorhanden ist.
  const hasSelectedImage = typeof selectedImageUri === 'string' && selectedImageUri.length > 0;

  // Diese Funktion reagiert auf den Analyse-Button.
  function handleAnalyzeImage(): void {
    // Diese Zeile prüft, ob ein Bild für die Analyse vorhanden ist.
    if (!selectedImageUri) {
      // Diese Zeile zeigt einen klaren Hinweis bei fehlendem Bild an.
      Alert.alert('Missing image', 'No image selected.');

      // Diese Zeile beendet die Funktion ohne Navigation.
      return;
    }

    // Diese Zeile erstellt eine Liste mit vorläufigen Beispielerkennungen.
    const sampleTrafficSignDetections: TrafficSignDetectionPreview[] = [
      // Diese Zeile definiert die erste Beispielerkennung.
      {
        // Diese Zeile setzt die Kennung der Erkennung.
        id: 'sample-detection-1',
        // Diese Zeile setzt das technische Label.
        label: 'stop',
        // Diese Zeile setzt die Beispielwahrscheinlichkeit.
        confidence: 0.94,
        // Diese Zeile setzt die verständliche Bedeutung.
        meaning: 'Must stop'
      }
    ];

    // Diese Zeile navigiert mit Platzhalterdaten zum Ergebnisbildschirm.
    navigation.navigate('DetectionResultScreen', {
      // Diese Zeile übergibt die Bildadresse.
      imageUri: selectedImageUri,
      // Diese Zeile übergibt eine vorläufige Bildbreite.
      sourceImageWidth: 1000,
      // Diese Zeile übergibt eine vorläufige Bildhöhe.
      sourceImageHeight: 1000,
      // Diese Zeile übergibt die vorläufigen Beispielerkennungen.
      detections: sampleTrafficSignDetections
    });
  }

  // Diese Funktion bringt den Benutzer zurück zum Startbildschirm.
  function handleChooseAnotherImage(): void {
    // Diese Zeile navigiert zurück zum Startbildschirm.
    navigation.navigate('HomeScreen');
  }

  // Diese Zeile gibt die gesamte Benutzeroberfläche des Bildprüfungsbildschirms zurück.
  return (
    // Diese Zeile sorgt dafür, dass der Bildschirm die sicheren Ränder des Geräts beachtet.
    <SafeAreaView style={styles.safeArea}>
      {/* Diese Zeile rendert den scrollbaren Inhalt des Bildschirms. */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Diese Zeile rendert den oberen Kopfbereich des Bildschirms. */}
        <View style={styles.headerSection}>
          {/* Diese Zeile zeigt die Hauptüberschrift des Bildschirms an. */}
          <Text style={styles.screenTitle}>Image Review Screen</Text>

          {/* Diese Zeile zeigt die kurze Beschreibung des Bildschirms an. */}
          <Text style={styles.screenDescription}>
            Review the selected image before starting the analysis.
          </Text>
        </View>

        {/* Diese Zeile rendert den Bildbereich des Screens. */}
        <View style={styles.imagePreviewContainer}>
          {/* Diese Zeile prüft, ob ein Bild angezeigt werden kann. */}
          {hasSelectedImage ? (
            <>
              {/* Diese Zeile rendert die zoombare Bildvorschau. */}
              <ZoomableImagePreview imageUri={selectedImageUri} />
            </>
          ) : (
            <>
              {/* Diese Zeile zeigt die geforderte Fallback-Nachricht an. */}
              <Text style={styles.fallbackText}>No image selected.</Text>
            </>
          )}
        </View>

        {/* Diese Zeile rendert den Button zum Starten der Analyse. */}
        <ScreenActionButton
          // Diese Zeile setzt den sichtbaren Text des Buttons.
          title="Analyze Image"
          // Diese Zeile verbindet den Button mit der Analysefunktion.
          onPress={handleAnalyzeImage}
        />

        {/* Diese Zeile rendert den Button zum erneuten Auswählen eines Bildes. */}
        <ScreenActionButton
          // Diese Zeile setzt den sichtbaren Text des Buttons.
          title="Choose Another Image"
          // Diese Zeile verbindet den Button mit der Rücknavigation.
          onPress={handleChooseAnotherImage}
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

  // Diese Regel gestaltet den äußeren Container der Bildvorschau.
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
    height: 320,
    // Diese Zeile richtet den Inhalt vertikal mittig aus.
    justifyContent: 'center',
    // Diese Zeile richtet den Inhalt horizontal mittig aus.
    alignItems: 'center',
    // Diese Zeile schneidet vergrößerte Bildbereiche sauber am Container ab.
    overflow: 'hidden'
  },

  // Diese Regel gestaltet den Fallback-Text bei fehlendem Bild.
  fallbackText: {
    // Diese Zeile setzt die Schriftgröße des Textes.
    fontSize: 18,
    // Diese Zeile macht den Text gut lesbar.
    fontWeight: '600',
    // Diese Zeile setzt die weichere Textfarbe.
    color: colorPalette.textSecondary,
    // Diese Zeile richtet den Text mittig aus.
    textAlign: 'center'
  }
});