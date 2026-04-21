// Diese Zeile importiert React, damit wir eine Komponente definieren können.
import React from 'react';

// Diese Zeile importiert die benötigten Bausteine aus React Native.
import { StyleSheet, Text, View } from 'react-native';

// Diese Zeile importiert die Farbpalette der Anwendung.
import { colorPalette } from '../constants/colorPalette';

// Diese Zeile importiert die wiederverwendbaren Abstände und Größen.
import { layoutValues } from '../constants/layoutValues';


// Diese Typdefinition beschreibt die Eingaben der Ergebnis-Karte.
type DetectionResultCardProperties = {
  // Diese Zeile definiert das Label der Erkennung.
  label: string;

  // Diese Zeile definiert die Wahrscheinlichkeit der Erkennung.
  confidence: number;

  // Diese Zeile definiert die lokale Bedeutung des Verkehrszeichens.
  meaning: string;
};


// Diese Funktion rendert eine Karte für ein erkanntes Verkehrszeichen.
export function DetectionResultCard(properties: DetectionResultCardProperties): React.JSX.Element {
  // Diese Zeile berechnet den Prozentwert der Wahrscheinlichkeit.
  const confidencePercentage = Math.round(properties.confidence * 100);

  // Diese Zeile gibt die sichtbare Ergebnis-Karte zurück.
  return (
    // Diese Zeile rendert den Kartencontainer.
    <View style={styles.card}>
      {/* Diese Zeile zeigt das Label des Verkehrszeichens an. */}
      <Text style={styles.labelTitle}>{properties.label}</Text>

      {/* Diese Zeile zeigt die Wahrscheinlichkeit an. */}
      <Text style={styles.confidenceText}>Confidence: {confidencePercentage}%</Text>

      {/* Diese Zeile zeigt die lokale Bedeutung an. */}
      <Text style={styles.meaningText}>{properties.meaning}</Text>
    </View>
  );
}


// Diese Konstante enthält alle Styles der Ergebnis-Karte.
const styles = StyleSheet.create({
  // Diese Regel gestaltet den äußeren Kartencontainer.
  card: {
    // Diese Zeile setzt die Hintergrundfarbe der Karte.
    backgroundColor: colorPalette.surfacePrimary,

    // Diese Zeile erzeugt Innenabstand.
    padding: layoutValues.large,

    // Diese Zeile rundet die Ecken der Karte ab.
    borderRadius: layoutValues.cardRadius,

    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.medium,

    // Diese Zeile zeichnet einen feinen Rand.
    borderWidth: 1,

    // Diese Zeile setzt die Randfarbe.
    borderColor: colorPalette.borderPrimary
  },

  // Diese Regel gestaltet den Titel der Karte.
  labelTitle: {
    // Diese Zeile setzt die Schriftgröße.
    fontSize: 18,

    // Diese Zeile macht den Titel fett.
    fontWeight: '700',

    // Diese Zeile setzt die Haupttextfarbe.
    color: colorPalette.textPrimary,

    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.small
  },

  // Diese Regel gestaltet die Confidence-Zeile.
  confidenceText: {
    // Diese Zeile setzt die Schriftgröße.
    fontSize: 15,

    // Diese Zeile setzt die weichere Textfarbe.
    color: colorPalette.textSecondary,

    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.small
  },

  // Diese Regel gestaltet die Meaning-Zeile.
  meaningText: {
    // Diese Zeile setzt die Schriftgröße.
    fontSize: 15,

    // Diese Zeile setzt die Haupttextfarbe.
    color: colorPalette.textPrimary,

    // Diese Zeile erhöht die Lesbarkeit.
    lineHeight: 22
  }
});