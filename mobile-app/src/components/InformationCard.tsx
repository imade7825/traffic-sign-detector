import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colorPalette } from "../constants/colorPalette";
import { layoutValues } from "../constants/layoutValues";

// Diese Typdefinition beschreibt die Eingaben der Informationskarte.
type InformationCardProperties = {
  // Diese Zeile definiert den Titel der Karte.
  title: string;
  // Diese Zeile definiert die Beschreibung der Karte.
  description: string;
};

// Diese Funktion rendert eine einfache Informationskarte.
export function InformationCard(
  properties: InformationCardProperties
): React.JSX.Element {
  // Diese Zeile gibt die sichtbare Karte zurück.
  return (
    <View style={styles.card}>
      {/* Diese Zeile zeigt den Titel der Karte an. */}
      <Text style={styles.title}>{properties.title}</Text>
      {/* Diese Zeile zeigt die Beschreibung der Karte an. */}
      <Text style={styles.description}>{properties.description}</Text>
    </View>
  );
}

// Diese Konstante enthält alle Styles der Informationskarte.
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
    borderColor: colorPalette.borderPrimary,
  },
  // Diese Regel gestaltet den Titel der Karte.
  title: {
    // Diese Zeile setzt die Schriftgröße des Titels.
    fontSize: 18,
    // Diese Zeile macht den Titel fett.
    fontWeight: "700",
    // Diese Zeile setzt die Haupttextfarbe.
    color: colorPalette.textPrimary,
    // Diese Zeile erzeugt Abstand unter dem Titel.
    marginBottom: layoutValues.small,
  },
  // Diese Regel gestaltet die Beschreibung der Karte.
  description: {
    // Diese Zeile setzt die Schriftgröße der Beschreibung.
    fontSize: 15,
    // Diese Zeile setzt die weichere Textfarbe.
    color: colorPalette.textSecondary,
    // Diese Zeile erhöht die Lesbarkeit mit mehr Zeilenhöhe.
    lineHeight: 22,
  },
});
