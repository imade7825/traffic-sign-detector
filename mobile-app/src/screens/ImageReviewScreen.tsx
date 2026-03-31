// Diese Zeile importiert React, damit wir eine Funktionskomponente schreiben können.
import React from "react";

// Diese Zeile importiert die benötigten Bausteine aus React Native.
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Diese Zeile importiert die Safe-Area-Ansicht.
import { SafeAreaView } from "react-native-safe-area-context";

// Diese Zeile importiert den wiederverwendbaren Aktionsbutton.
import { ScreenActionButton } from "../components/ScreenActionButton";

// Diese Zeile importiert die zoombare Bildkomponente.
import { ZoomableImagePreview } from "../components/ZoomableImagePreview";

// Diese Zeile importiert die Farbpalette der Anwendung.
import { colorPalette } from "../constants/colorPalette";

// Diese Zeile importiert die wiederverwendbaren Abstände und Größen.
import { layoutValues } from "../constants/layoutValues";

// Diese Zeile importiert den Detection-Service der App.
import { analyzeImageWithBackend } from "../services/detectionService";

// Diese Zeile importiert die typisierten Eigenschaften des Bildprüfungsbildschirms.
import type { ImageReviewScreenProperties } from "../types/applicationNavigation";

// Diese Funktion rendert den Bildprüfungsbildschirm.
export function ImageReviewScreen({
  navigation,
  route,
}: ImageReviewScreenProperties): React.JSX.Element {
  // Diese Zeile liest die Bildadresse sicher aus den Navigationsparametern.
  const selectedImageUri = route.params?.imageUri;

  // Diese Zeile prüft, ob eine nutzbare Bildadresse vorhanden ist.
  const hasSelectedImage =
    typeof selectedImageUri === "string" && selectedImageUri.length > 0;

  // Diese Zeile speichert den aktuellen Loading-Zustand der Analyse.
  const [isAnalyzingImage, setIsAnalyzingImage] = React.useState(false);

  // Diese Funktion startet die Bildanalyse über das Backend.
  async function handleAnalyzeImage(): Promise<void> {
    // Diese Zeile verhindert doppelte Analyseaufrufe während des Ladens.
    if (isAnalyzingImage) {
      // Diese Zeile beendet die Funktion sofort.
      return;
    }

    // Diese Zeile prüft, ob ein Bild vorhanden ist.
    if (!selectedImageUri) {
      // Diese Zeile zeigt einen Hinweis bei fehlendem Bild an.
      Alert.alert("Missing image", "No image selected.");

      // Diese Zeile beendet die Funktion ohne Analyse.
      return;
    }

    // Diese Zeile setzt den Loading-Zustand auf aktiv.
    setIsAnalyzingImage(true);

    // Diese Zeile startet einen Fehler-sicheren Analyseblock.
    try {
      // Diese Zeile ruft die Backend-Analyse auf.
      const detectionResponse = await analyzeImageWithBackend(selectedImageUri);

      // Diese Zeile navigiert mit den echten Backend-Daten zum Ergebnisbildschirm.
      navigation.navigate("DetectionResultScreen", {
        imageUri: selectedImageUri,
        sourceImageWidth: detectionResponse.sourceImageWidth,
        sourceImageHeight: detectionResponse.sourceImageHeight,
        detections: detectionResponse.detections,
      });
    } catch (error) {
      // Diese Zeile schreibt den echten Fehler in die Konsole.
      console.error("Detection error:", error);

      // Diese Zeile zeigt weiterhin den geforderten Alerttext an.
      Alert.alert(
        "Analysis failed",
        "Image analysis failed. Please try again."
      );
    } finally {
      // Diese Zeile beendet den Loading-Zustand immer.
      setIsAnalyzingImage(false);
    }
  }

  // Diese Funktion bringt den Benutzer zurück zum Startbildschirm.
  function handleChooseAnotherImage(): void {
    // Diese Zeile prüft, ob gerade eine Analyse läuft.
    if (isAnalyzingImage) {
      // Diese Zeile beendet die Funktion während des Loadings.
      return;
    }

    // Diese Zeile navigiert zurück zum Startbildschirm.
    navigation.navigate("HomeScreen");
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
              {/* Diese Zeile zeigt die Fallback-Nachricht an. */}
              <Text style={styles.fallbackText}>No image selected.</Text>
            </>
          )}
        </View>

        {/* Diese Zeile prüft, ob gerade analysiert wird. */}
        {isAnalyzingImage ? (
          <>
            {/* Diese Zeile rendert den Ladebereich. */}
            <View style={styles.loadingContainer}>
              {/* Diese Zeile zeigt den Ladeindikator an. */}
              <ActivityIndicator
                size="large"
                color={colorPalette.accentPrimary}
              />

              {/* Diese Zeile zeigt einen Ladehinweis an. */}
              <Text style={styles.loadingText}>Analyzing image...</Text>
            </View>
          </>
        ) : null}

        {/* Diese Zeile rendert den Button zum Starten der Analyse. */}
        <ScreenActionButton
          // Diese Zeile setzt den sichtbaren Text des Buttons.
          title={isAnalyzingImage ? "Analyzing Image..." : "Analyze Image"}
          // Diese Zeile verbindet den Button mit der Analysefunktion.
          onPress={() => {
            // Diese Zeile startet die asynchrone Analyse ohne Rückgabewert im UI-Kontext.
            void handleAnalyzeImage();
          }}
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
    flex: 1,
  },

  // Diese Regel gestaltet den inneren Abstand des scrollbaren Inhalts.
  scrollContent: {
    // Diese Zeile erzeugt oberen Abstand.
    paddingTop: layoutValues.large,
    // Diese Zeile erzeugt horizontalen Abstand.
    paddingHorizontal: layoutValues.large,
    // Diese Zeile erzeugt unteren Abstand.
    paddingBottom: layoutValues.extraLarge,
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
    borderColor: colorPalette.borderPrimary,
  },

  // Diese Regel gestaltet die Hauptüberschrift.
  screenTitle: {
    // Diese Zeile setzt eine große Schriftgröße.
    fontSize: 28,
    // Diese Zeile macht die Überschrift deutlich fett.
    fontWeight: "700",
    // Diese Zeile setzt die Haupttextfarbe.
    color: colorPalette.textPrimary,
    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.small,
  },

  // Diese Regel gestaltet die erklärende Beschreibung.
  screenDescription: {
    // Diese Zeile setzt die Schriftgröße der Beschreibung.
    fontSize: 16,
    // Diese Zeile setzt die weichere Textfarbe.
    color: colorPalette.textSecondary,
    // Diese Zeile erhöht die Lesbarkeit durch mehr Zeilenhöhe.
    lineHeight: 24,
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
    justifyContent: "center",
    // Diese Zeile richtet den Inhalt horizontal mittig aus.
    alignItems: "center",
    // Diese Zeile schneidet vergrößerte Bildbereiche sauber am Container ab.
    overflow: "hidden",
  },

  // Diese Regel gestaltet den Fallback-Text bei fehlendem Bild.
  fallbackText: {
    // Diese Zeile setzt die Schriftgröße des Textes.
    fontSize: 18,
    // Diese Zeile macht den Text gut lesbar.
    fontWeight: "600",
    // Diese Zeile setzt die weichere Textfarbe.
    color: colorPalette.textSecondary,
    // Diese Zeile richtet den Text mittig aus.
    textAlign: "center",
  },

  // Diese Regel gestaltet den Ladebereich.
  loadingContainer: {
    // Diese Zeile richtet den Inhalt mittig aus.
    alignItems: "center",
    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.large,
  },

  // Diese Regel gestaltet den Ladetext.
  loadingText: {
    // Diese Zeile setzt die Schriftgröße.
    fontSize: 16,
    // Diese Zeile setzt die weichere Textfarbe.
    color: colorPalette.textSecondary,
    // Diese Zeile erzeugt Abstand oberhalb.
    marginTop: layoutValues.small,
  },
});
