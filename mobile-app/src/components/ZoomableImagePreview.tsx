// Diese Zeile importiert React, damit wir eine Komponente definieren können.
import React from 'react';

// Diese Zeile importiert die StyleSheet-Hilfe aus React Native.
import { StyleSheet } from 'react-native';

// Diese Zeile importiert den Gesture-Builder und den Gesture-Container.
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

// Diese Zeile importiert Reanimated für flüssige Zoom- und Verschiebe-Animationen.
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';


// Diese Typdefinition beschreibt die Eingaben der Zoom-Komponente.
type ZoomableImagePreviewProperties = {
  // Diese Zeile definiert die Bildadresse.
  imageUri: string;
};


// Diese Funktion rendert eine Bildvorschau mit Pinch-to-Zoom und freiem Verschieben.
export function ZoomableImagePreview(
  properties: ZoomableImagePreviewProperties
): React.JSX.Element {
  // Diese Zeile speichert den aktuell sichtbaren Zoomfaktor.
  const currentScale = useSharedValue(1);

  // Diese Zeile speichert den zuletzt bestätigten Zoomfaktor.
  const savedScale = useSharedValue(1);

  // Diese Zeile speichert die aktuelle horizontale Verschiebung.
  const translationX = useSharedValue(0);

  // Diese Zeile speichert die aktuelle vertikale Verschiebung.
  const translationY = useSharedValue(0);

  // Diese Zeile speichert die zuletzt bestätigte horizontale Verschiebung.
  const savedTranslationX = useSharedValue(0);

  // Diese Zeile speichert die zuletzt bestätigte vertikale Verschiebung.
  const savedTranslationY = useSharedValue(0);

  // Diese Zeile definiert die Pinch-Geste für das Vergrößern und Verkleinern.
  const pinchGesture = Gesture.Pinch()
    // Diese Zeile reagiert auf jede Änderung der Pinch-Geste.
    .onUpdate((event) => {
      // Diese Zeile berechnet den neuen Zoomfaktor auf Basis des letzten Werts.
      const nextScale = savedScale.value * event.scale;

      // Diese Zeile begrenzt den Zoomfaktor zwischen 1 und 4.
      currentScale.value = Math.max(1, Math.min(nextScale, 4));
    })
    // Diese Zeile speichert den aktuellen Zoomwert nach dem Loslassen.
    .onEnd(() => {
      // Diese Zeile übernimmt den aktuellen Wert als neuen Ausgangswert.
      savedScale.value = currentScale.value;

      // Diese Zeile setzt die Verschiebung zurück, wenn das Bild wieder Normalgröße hat.
      if (currentScale.value <= 1) {
        // Diese Zeile setzt die horizontale Verschiebung zurück.
        translationX.value = 0;

        // Diese Zeile setzt die vertikale Verschiebung zurück.
        translationY.value = 0;

        // Diese Zeile speichert die zurückgesetzte horizontale Verschiebung.
        savedTranslationX.value = 0;

        // Diese Zeile speichert die zurückgesetzte vertikale Verschiebung.
        savedTranslationY.value = 0;
      }
    });

  // Diese Zeile definiert die Pan-Geste für das freie Verschieben des Bildes.
  const panGesture = Gesture.Pan()
    // Diese Zeile reagiert auf jede Änderung der Verschiebe-Geste.
    .onUpdate((event) => {
      // Diese Zeile verhindert das Verschieben, solange nicht hineingezoomt wurde.
      if (currentScale.value <= 1) {
        // Diese Zeile beendet die Aktualisierung ohne Verschiebung.
        return;
      }

      // Diese Zeile berechnet die neue horizontale Verschiebung.
      translationX.value = savedTranslationX.value + event.translationX;

      // Diese Zeile berechnet die neue vertikale Verschiebung.
      translationY.value = savedTranslationY.value + event.translationY;
    })
    // Diese Zeile speichert die aktuelle Verschiebung nach dem Loslassen.
    .onEnd(() => {
      // Diese Zeile übernimmt die horizontale Position als neuen Ausgangswert.
      savedTranslationX.value = translationX.value;

      // Diese Zeile übernimmt die vertikale Position als neuen Ausgangswert.
      savedTranslationY.value = translationY.value;
    });

  // Diese Zeile kombiniert beide Gesten so, dass sie gleichzeitig funktionieren.
  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  // Diese Zeile erzeugt den animierten Stil für Zoom und Verschiebung.
  const animatedImageStyle = useAnimatedStyle(() => {
    // Diese Zeile gibt die Transformationsregeln für das Bild zurück.
    return {
      // Diese Zeile kombiniert Verschiebung und Skalierung.
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
        { scale: currentScale.value }
      ]
    };
  });

  // Diese Zeile gibt die sichtbare Zoom-Komponente zurück.
  return (
    // Diese Zeile verbindet die kombinierten Gesten mit dem Bild.
    <GestureDetector gesture={composedGesture}>
      {/* Diese Zeile rendert das Bild als animierbares Element. */}
      <Animated.Image
        // Diese Zeile setzt die Bildquelle.
        source={{ uri: properties.imageUri }}
        // Diese Zeile kombiniert Basisstil und animierten Stil.
        style={[styles.imagePreview, animatedImageStyle]}
        // Diese Zeile sorgt dafür, dass das Bild ohne Verzerrung eingepasst wird.
        resizeMode="contain"
      />
    </GestureDetector>
  );
}


// Diese Konstante enthält die Styles der Zoom-Komponente.
const styles = StyleSheet.create({
  // Diese Regel gestaltet das eigentliche Vorschaubild.
  imagePreview: {
    // Diese Zeile setzt die Breite des Bildes auf die gesamte Containerbreite.
    width: '100%',

    // Diese Zeile setzt die Höhe des Bildes auf die gesamte Containerhöhe.
    height: '100%'
  }
});