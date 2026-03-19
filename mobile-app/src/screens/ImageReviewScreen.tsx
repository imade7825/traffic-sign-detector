// Diese Zeile importiert React, damit wir eine Funktionskomponente schreiben können.
import React from "react";
// Diese Zeile importiert die benötigten Bausteine aus React Native.
import { ScrollView, StyleSheet, Text, View } from "react-native";
// Diese Zeile importiert die Safe-Area-Ansicht.
import { SafeAreaView } from "react-native-safe-area-context";
// Diese Zeile importiert die wiederverwendbare Informationskarte.
import { InformationCard } from "../components/InformationCard";
// Diese Zeile importiert den wiederverwendbaren Aktionsbutton.
import { ScreenActionButton } from "../components/ScreenActionButton";
// Diese Zeile importiert die Farbpalette der Anwendung.
import { colorPalette } from "../constants/colorPalette";
// Diese Zeile importiert die wiederverwendbaren Abstände und Größen.
import { layoutValues } from "../constants/layoutValues";
// Diese Zeile importiert die typisierten Eigenschaften des Bildprüfungsbildschirms.
import type {
  ImageReviewScreenProperties,
  TrafficSignDetectionPreview,
} from "../types/applicationNavigation";

// Diese Funktion rendert den Bildprüfungsbildschirm.
export function ImageReviewScreen({
  navigation,
  route,
}: ImageReviewScreenProperties): React.JSX.Element {
  // Diese Zeile liest die Bildadresse aus den Navigationsparametern.
  const { imageUri } = route.params;

  // Diese Funktion öffnet den Ergebnisbildschirm mit Testdaten.
  function handleAnalyzeImage(): void {
    // Diese Zeile erstellt eine Liste von Beispielerkennungen.
    const sampleTrafficSignDetections: TrafficSignDetectionPreview[] = [
      // Diese Zeile definiert die erste Beispielerkennung.
      {
        // Diese Zeile setzt die Kennung der ersten Erkennung.
        id: "detection-1",
        // Diese Zeile setzt das technische Label.
        label: "speed_limit_50",
        // Diese Zeile setzt die Beispielwahrscheinlichkeit.
        confidence: 0.97,
        // Diese Zeile setzt die verständliche Bedeutung.
        meaning: "Maximum speed 50 km/h",
      },
      // Diese Zeile definiert die zweite Beispielerkennung.
      {
        // Diese Zeile setzt die Kennung der zweiten Erkennung.
        id: "detection-2",
        // Diese Zeile setzt das technische Label.
        label: "stop",
        // Diese Zeile setzt die Beispielwahrscheinlichkeit.
        confidence: 0.93,
        // Diese Zeile setzt die verständliche Bedeutung.
        meaning: "Stop and give way before continuing",
      },
    ];

    // Diese Zeile navigiert zum Ergebnisbildschirm und übergibt alle erforderlichen Parameter.
    navigation.navigate("DetectionResultScreen", {
      // Diese Zeile übergibt die Bildadresse.
      imageUri,
      // Diese Zeile übergibt eine Beispielbreite des Ursprungsbildes.
      sourceImageWidth: 1280,
      // Diese Zeile übergibt eine Beispielhöhe des Ursprungsbildes.
      sourceImageHeight: 720,
      // Diese Zeile übergibt die Liste der Beispielerkennungen.
      detections: sampleTrafficSignDetections,
    });
  }

  // Diese Funktion navigiert zurück zum Startbildschirm.
  function handleOpenHomeScreen(): void {
    // Diese Zeile navigiert zum Startbildschirm.
    navigation.navigate("HomeScreen");
  }

  // Diese Zeile gibt die gesamte Benutzeroberfläche des Bildprüfungsbildschirms zurück.
  return (
    // Diese Zeile sorgt dafür, dass der Bildschirm die sicheren Ränder des Geräts beachtet.
    <SafeAreaView style={styles.safeArea}>
      {/* Diese Zeile rendert einen scrollbaren Inhalt. */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Diese Zeile gruppiert den oberen Einführungsbereich. */}
        <View style={styles.headerSection}>
          {/* Diese Zeile zeigt die Überschrift des Bildschirms an. */}
          <Text style={styles.screenTitle}>Image Review Screen</Text>
          {/* Diese Zeile erklärt die Aufgabe des Bildschirms. */}
          <Text style={styles.screenDescription}>
            This screen receives a typed imageUri parameter and prepares the
            transition to the detection result.
          </Text>
        </View>

        {/* Diese Zeile zeigt die übergebene Bildadresse an. */}
        <InformationCard
          // Diese Zeile setzt den Titel der Karte.
          title="Received image parameter"
          // Diese Zeile setzt die Beschreibung der Karte.
          description={imageUri}
        />

        {/* Diese Zeile rendert den Button zur Analyse und Ergebnisnavigation. */}
        <ScreenActionButton
          // Diese Zeile setzt den sichtbaren Text des Buttons.
          title="Analyze Image and Open Detection Result"
          // Diese Zeile verbindet den Button mit der Navigationsfunktion.
          onPress={handleAnalyzeImage}
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
});
