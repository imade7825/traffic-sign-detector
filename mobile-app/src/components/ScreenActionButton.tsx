// Diese Zeile importiert React, damit wir eine Komponente definieren können.
import React from 'react';
// Diese Zeile importiert die benötigten Bausteine aus React Native.
import { Pressable, StyleSheet, Text } from 'react-native';
// Diese Zeile importiert die Farbpalette der Anwendung.
import { colorPalette } from '../constants/colorPalette';
// Diese Zeile importiert die wiederverwendbaren Abstände und Größen.
import { layoutValues } from '../constants/layoutValues';


// Diese Typdefinition beschreibt die Eingaben des Buttons.
type ScreenActionButtonProperties = {
  // Diese Zeile definiert den sichtbaren Text des Buttons.
  title: string;
  // Diese Zeile definiert die Funktion, die beim Drücken ausgeführt wird.
  onPress: () => void;
};


// Diese Funktion rendert einen wiederverwendbaren Aktionsbutton für die Bildschirme.
export function ScreenActionButton(properties: ScreenActionButtonProperties): React.JSX.Element {
  // Diese Zeile gibt den sichtbaren Button zurück.
  return (
    // Diese Zeile rendert eine drückbare Fläche.
    <Pressable style={styles.button} onPress={properties.onPress}>
      {/* Diese Zeile zeigt den Text des Buttons an. */}
      <Text style={styles.buttonText}>{properties.title}</Text>
    </Pressable>
  );
}


// Diese Konstante enthält alle Styles des Buttons.
const styles = StyleSheet.create({
  // Diese Regel gestaltet den äußeren Button.
  button: {
    // Diese Zeile setzt die Hintergrundfarbe des Buttons.
    backgroundColor: colorPalette.accentPrimary,
    // Diese Zeile erzeugt Innenabstand im Button.
    paddingVertical: layoutValues.medium,
    // Diese Zeile erzeugt horizontalen Innenabstand im Button.
    paddingHorizontal: layoutValues.large,
    // Diese Zeile rundet die Ecken des Buttons ab.
    borderRadius: layoutValues.cardRadius,
    // Diese Zeile erzeugt Abstand unter dem Button.
    marginBottom: layoutValues.medium
  },
  // Diese Regel gestaltet den Text des Buttons.
  buttonText: {
    // Diese Zeile setzt die Textfarbe des Buttons.
    color: '#FFFFFF',
    // Diese Zeile setzt die Schriftgröße.
    fontSize: 16,
    // Diese Zeile macht den Text deutlich lesbar.
    fontWeight: '700',
    // Diese Zeile richtet den Text mittig aus.
    textAlign: 'center'
  }
});