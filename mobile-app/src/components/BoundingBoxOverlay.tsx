// Diese Zeile importiert React, damit wir JSX verwenden können.
import React from 'react';

// Diese Zeile importiert die benötigten Bausteine aus React Native.
import { StyleSheet, Text, View } from 'react-native';

// Diese Zeile importiert den Typ für eine einzelne Erkennung.
import type { TrafficSignDetection } from '../types/applicationNavigation';


// Diese Typdefinition beschreibt ein Rechteck im Overlay.
type OverlayRectangle = {
  // Diese Zeile definiert die linke Kante.
  left: number;
  // Diese Zeile definiert die obere Kante.
  top: number;
  // Diese Zeile definiert die rechte Kante.
  right: number;
  // Diese Zeile definiert die untere Kante.
  bottom: number;
};


// Diese Typdefinition beschreibt eine Verbindungslinie zwischen Label und Box.
type ConnectorLine = {
  // Diese Zeile definiert die linke Position der Linie.
  left: number;
  // Diese Zeile definiert die obere Position der Linie.
  top: number;
  // Diese Zeile definiert die Länge der Linie.
  length: number;
  // Diese Zeile definiert den Winkel der Linie in Grad.
  angleInDegrees: number;
};


// Diese Typdefinition beschreibt eine vorberechnete sichtbare Erkennung.
type PositionedDetection = {
  // Diese Zeile definiert die eindeutige Kennung der Erkennung.
  id: string;
  // Diese Zeile definiert das Label der Erkennung.
  label: string;
  // Diese Zeile definiert das Rechteck der Box.
  boxRectangle: OverlayRectangle;
  // Diese Zeile definiert das Rechteck des Labels.
  labelRectangle: OverlayRectangle;
  // Diese Zeile definiert die Verbindungslinie.
  connectorLine: ConnectorLine;
};


// Diese Typdefinition beschreibt die Eingaben des Overlays.
type BoundingBoxOverlayProperties = {
  // Diese Zeile definiert die Liste aller Erkennungen.
  detections: TrafficSignDetection[];
  // Diese Zeile definiert die Breite des Ursprungsbildes.
  sourceImageWidth: number;
  // Diese Zeile definiert die Höhe des Ursprungsbildes.
  sourceImageHeight: number;
  // Diese Zeile definiert die sichtbare Breite der echten Bildfläche.
  canvasWidth: number;
  // Diese Zeile definiert die sichtbare Höhe der echten Bildfläche.
  canvasHeight: number;
};


// Diese Konstante definiert die Höhe des Labels.
const labelHeight = 28;


// Diese Funktion prüft, ob sich zwei Rechtecke überschneiden.
function rectanglesOverlap(firstRectangle: OverlayRectangle, secondRectangle: OverlayRectangle): boolean {
  // Diese Zeile prüft, ob das erste Rechteck komplett links vom zweiten liegt.
  if (firstRectangle.right <= secondRectangle.left) {
    // Diese Zeile gibt zurück, dass keine Überschneidung vorliegt.
    return false;
  }

  // Diese Zeile prüft, ob das zweite Rechteck komplett links vom ersten liegt.
  if (secondRectangle.right <= firstRectangle.left) {
    // Diese Zeile gibt zurück, dass keine Überschneidung vorliegt.
    return false;
  }

  // Diese Zeile prüft, ob das erste Rechteck komplett oberhalb des zweiten liegt.
  if (firstRectangle.bottom <= secondRectangle.top) {
    // Diese Zeile gibt zurück, dass keine Überschneidung vorliegt.
    return false;
  }

  // Diese Zeile prüft, ob das zweite Rechteck komplett oberhalb des ersten liegt.
  if (secondRectangle.bottom <= firstRectangle.top) {
    // Diese Zeile gibt zurück, dass keine Überschneidung vorliegt.
    return false;
  }

  // Diese Zeile gibt zurück, dass sich die Rechtecke überschneiden.
  return true;
}


// Diese Funktion hält ein Rechteck innerhalb der sichtbaren Bildfläche.
function clampRectangleToCanvas(
  canvasWidth: number,
  canvasHeight: number,
  rectangle: OverlayRectangle
): OverlayRectangle {
  // Diese Zeile berechnet die Rechteckbreite.
  const rectangleWidth = rectangle.right - rectangle.left;

  // Diese Zeile berechnet die Rechteckhöhe.
  const rectangleHeight = rectangle.bottom - rectangle.top;

  // Diese Zeile setzt die linke Kante zunächst auf den vorhandenen Wert.
  let nextLeft = rectangle.left;

  // Diese Zeile setzt die obere Kante zunächst auf den vorhandenen Wert.
  let nextTop = rectangle.top;

  // Diese Zeile verhindert, dass das Rechteck links aus dem Bild ragt.
  if (nextLeft < 0) {
    // Diese Zeile setzt die linke Kante auf den linken Rand.
    nextLeft = 0;
  }

  // Diese Zeile verhindert, dass das Rechteck oben aus dem Bild ragt.
  if (nextTop < 0) {
    // Diese Zeile setzt die obere Kante auf den oberen Rand.
    nextTop = 0;
  }

  // Diese Zeile verhindert, dass das Rechteck rechts aus dem Bild ragt.
  if (nextLeft + rectangleWidth > canvasWidth) {
    // Diese Zeile verschiebt das Rechteck nach links.
    nextLeft = Math.max(0, canvasWidth - rectangleWidth);
  }

  // Diese Zeile verhindert, dass das Rechteck unten aus dem Bild ragt.
  if (nextTop + rectangleHeight > canvasHeight) {
    // Diese Zeile verschiebt das Rechteck nach oben.
    nextTop = Math.max(0, canvasHeight - rectangleHeight);
  }

  // Diese Zeile gibt das korrigierte Rechteck zurück.
  return {
    left: nextLeft,
    top: nextTop,
    right: nextLeft + rectangleWidth,
    bottom: nextTop + rectangleHeight
  };
}


// Diese Funktion schätzt die Breite des Label-Hintergrunds.
function estimateLabelWidth(label: string): number {
  // Diese Zeile berechnet eine grobe Breite anhand der Textlänge.
  const estimatedWidth = label.length * 7 + 18;

  // Diese Zeile begrenzt die Breite sinnvoll nach unten und oben.
  return Math.max(90, Math.min(240, estimatedWidth));
}


// Diese Funktion sucht eine freie Position für das Label nahe der Bounding Box.
function findFreeLabelRectangle(
  canvasWidth: number,
  canvasHeight: number,
  boxRectangle: OverlayRectangle,
  currentLabelWidth: number,
  occupiedLabelRectangles: OverlayRectangle[],
  blockedObjectRectangles: OverlayRectangle[]
): OverlayRectangle {
  // Diese Zeile definiert den Abstand zwischen Box und Label.
  const outerMargin = 8;

  // Diese Zeile definiert den zusätzlichen vertikalen Abstand.
  const verticalGap = 6;

  // Diese Zeile definiert den zusätzlichen horizontalen Abstand.
  const horizontalGap = 6;

  // Diese Zeile definiert bevorzugte Kandidatenpositionen rund um die Box.
  const candidateRectangles: OverlayRectangle[] = [
    {
      left: boxRectangle.right + outerMargin,
      top: boxRectangle.top,
      right: boxRectangle.right + outerMargin + currentLabelWidth,
      bottom: boxRectangle.top + labelHeight
    },
    {
      left: boxRectangle.left,
      top: boxRectangle.top - labelHeight - outerMargin,
      right: boxRectangle.left + currentLabelWidth,
      bottom: boxRectangle.top - outerMargin
    },
    {
      left: boxRectangle.left,
      top: boxRectangle.bottom + outerMargin,
      right: boxRectangle.left + currentLabelWidth,
      bottom: boxRectangle.bottom + outerMargin + labelHeight
    },
    {
      left: boxRectangle.left - currentLabelWidth - outerMargin,
      top: boxRectangle.top,
      right: boxRectangle.left - outerMargin,
      bottom: boxRectangle.top + labelHeight
    }
  ];

  // Diese Zeile geht alle bevorzugten Positionen nacheinander durch.
  for (const candidateRectangle of candidateRectangles) {
    // Diese Zeile hält den Kandidaten innerhalb der Bildfläche.
    const clampedCandidateRectangle = clampRectangleToCanvas(
      canvasWidth,
      canvasHeight,
      candidateRectangle
    );

    // Diese Zeile prüft, ob das Label mit einem anderen Label kollidiert.
    const overlapsExistingLabel = occupiedLabelRectangles.some((occupiedLabelRectangle) =>
      rectanglesOverlap(clampedCandidateRectangle, occupiedLabelRectangle)
    );

    // Diese Zeile überspringt die Position bei Label-Kollision.
    if (overlapsExistingLabel) {
      // Diese Zeile testet die nächste Position.
      continue;
    }

    // Diese Zeile prüft, ob das Label ein anderes Schild verdeckt.
    const overlapsBlockedObject = blockedObjectRectangles.some((blockedObjectRectangle) =>
      rectanglesOverlap(clampedCandidateRectangle, blockedObjectRectangle)
    );

    // Diese Zeile gibt die Position zurück, wenn sie frei ist.
    if (!overlapsBlockedObject) {
      return clampedCandidateRectangle;
    }
  }

  // Diese Zeile testet zusätzliche Ausweichpositionen mit wachsendem Abstand.
  for (let stackingOffsetIndex = 1; stackingOffsetIndex < 20; stackingOffsetIndex += 1) {
    // Diese Zeile definiert zusätzliche Ausweichpositionen.
    const additionalCandidateRectangles: OverlayRectangle[] = [
      {
        left:
          boxRectangle.right +
          outerMargin +
          ((currentLabelWidth + horizontalGap) * (stackingOffsetIndex - 1)),
        top: boxRectangle.top,
        right:
          boxRectangle.right +
          outerMargin +
          (currentLabelWidth * stackingOffsetIndex) +
          (horizontalGap * (stackingOffsetIndex - 1)),
        bottom: boxRectangle.top + labelHeight
      },
      {
        left: boxRectangle.left,
        top: boxRectangle.top - ((labelHeight + verticalGap) * stackingOffsetIndex) - outerMargin,
        right: boxRectangle.left + currentLabelWidth,
        bottom:
          boxRectangle.top -
          ((labelHeight + verticalGap) * (stackingOffsetIndex - 1)) -
          outerMargin
      },
      {
        left: boxRectangle.left,
        top:
          boxRectangle.bottom +
          outerMargin +
          ((labelHeight + verticalGap) * (stackingOffsetIndex - 1)),
        right: boxRectangle.left + currentLabelWidth,
        bottom:
          boxRectangle.bottom +
          outerMargin +
          labelHeight +
          ((labelHeight + verticalGap) * (stackingOffsetIndex - 1))
      },
      {
        left:
          boxRectangle.left -
          outerMargin -
          (currentLabelWidth * stackingOffsetIndex) -
          (horizontalGap * (stackingOffsetIndex - 1)),
        top: boxRectangle.top,
        right:
          boxRectangle.left -
          outerMargin -
          ((currentLabelWidth + horizontalGap) * (stackingOffsetIndex - 1)),
        bottom: boxRectangle.top + labelHeight
      }
    ];

    // Diese Zeile geht alle zusätzlichen Ausweichpositionen durch.
    for (const additionalCandidateRectangle of additionalCandidateRectangles) {
      // Diese Zeile hält den Kandidaten innerhalb der Bildfläche.
      const clampedAdditionalCandidateRectangle = clampRectangleToCanvas(
        canvasWidth,
        canvasHeight,
        additionalCandidateRectangle
      );

      // Diese Zeile prüft, ob das Label mit anderen Labels kollidiert.
      const overlapsExistingLabel = occupiedLabelRectangles.some((occupiedLabelRectangle) =>
        rectanglesOverlap(clampedAdditionalCandidateRectangle, occupiedLabelRectangle)
      );

      // Diese Zeile überspringt die Position bei Label-Kollision.
      if (overlapsExistingLabel) {
        // Diese Zeile testet die nächste Position.
        continue;
      }

      // Diese Zeile prüft, ob das Label ein anderes Schild verdeckt.
      const overlapsBlockedObject = blockedObjectRectangles.some((blockedObjectRectangle) =>
        rectanglesOverlap(clampedAdditionalCandidateRectangle, blockedObjectRectangle)
      );

      // Diese Zeile gibt die Position zurück, wenn sie frei ist.
      if (!overlapsBlockedObject) {
        return clampedAdditionalCandidateRectangle;
      }
    }
  }

  // Diese Zeile definiert eine letzte Ersatzposition rechts unten an der Box.
  const fallbackRectangle: OverlayRectangle = {
    left: boxRectangle.right + 8,
    top: boxRectangle.bottom + 8,
    right: boxRectangle.right + 8 + currentLabelWidth,
    bottom: boxRectangle.bottom + 8 + labelHeight
  };

  // Diese Zeile gibt die korrigierte Ersatzposition zurück.
  return clampRectangleToCanvas(canvasWidth, canvasHeight, fallbackRectangle);
}


// Diese Funktion berechnet den Mittelpunkt eines Rechtecks.
function readRectangleCenter(rectangle: OverlayRectangle): { centerX: number; centerY: number } {
  // Diese Zeile berechnet die X-Koordinate des Mittelpunkts.
  const centerX = rectangle.left + (rectangle.right - rectangle.left) / 2;

  // Diese Zeile berechnet die Y-Koordinate des Mittelpunkts.
  const centerY = rectangle.top + (rectangle.bottom - rectangle.top) / 2;

  // Diese Zeile gibt den Mittelpunkt zurück.
  return { centerX, centerY };
}


// Diese Funktion berechnet die Verbindungslinie zwischen Label und Box.
function createConnectorLine(
  labelRectangle: OverlayRectangle,
  boxRectangle: OverlayRectangle
): ConnectorLine {
  // Diese Zeile liest den Mittelpunkt des Labels.
  const { centerX: labelCenterX, centerY: labelCenterY } = readRectangleCenter(labelRectangle);

  // Diese Zeile liest den Mittelpunkt der Box.
  const { centerX: boxCenterX, centerY: boxCenterY } = readRectangleCenter(boxRectangle);

  // Diese Zeile berechnet die horizontale Distanz.
  const deltaX = boxCenterX - labelCenterX;

  // Diese Zeile berechnet die vertikale Distanz.
  const deltaY = boxCenterY - labelCenterY;

  // Diese Zeile berechnet die Länge der Linie.
  const lineLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Diese Zeile berechnet den Winkel in Grad.
  const angleInDegrees = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

  // Diese Zeile gibt die Verbindungslinie zurück.
  return {
    left: labelCenterX,
    top: labelCenterY,
    length: lineLength,
    angleInDegrees
  };
}


// Diese Funktion berechnet die sichtbaren Box- und Labelpositionen direkt auf der echten Bildfläche.
function createPositionedDetections(
  detections: TrafficSignDetection[],
  sourceImageWidth: number,
  sourceImageHeight: number,
  canvasWidth: number,
  canvasHeight: number
): PositionedDetection[] {
  // Diese Zeile berechnet den horizontalen Skalierungsfaktor.
  const horizontalScale = canvasWidth / sourceImageWidth;

  // Diese Zeile berechnet den vertikalen Skalierungsfaktor.
  const verticalScale = canvasHeight / sourceImageHeight;

  // Diese Zeile wandelt alle Bounding Boxes in sichtbare Canvaskoordinaten um.
  const positionedBoxEntries = detections
    .map((trafficSignDetection) => {
      // Diese Zeile berechnet die linke Kante.
      const left = trafficSignDetection.boundingBox.xMin * horizontalScale;

      // Diese Zeile berechnet die obere Kante.
      const top = trafficSignDetection.boundingBox.yMin * verticalScale;

      // Diese Zeile berechnet die rechte Kante.
      const right = trafficSignDetection.boundingBox.xMax * horizontalScale;

      // Diese Zeile berechnet die untere Kante.
      const bottom = trafficSignDetection.boundingBox.yMax * verticalScale;

      // Diese Zeile gibt die vorberechnete sichtbare Box zurück.
      return {
        id: trafficSignDetection.id,
        label: trafficSignDetection.label,
        boxRectangle: {
          left,
          top,
          right,
          bottom
        }
      };
    })
    // Diese Zeile sortiert die Erkennungen für eine stabilere Label-Platzierung.
    .sort((firstEntry, secondEntry) => {
      // Diese Zeile vergleicht zuerst die obere Kante.
      if (firstEntry.boxRectangle.top !== secondEntry.boxRectangle.top) {
        return firstEntry.boxRectangle.top - secondEntry.boxRectangle.top;
      }

      // Diese Zeile vergleicht danach die linke Kante.
      return firstEntry.boxRectangle.left - secondEntry.boxRectangle.left;
    });

  // Diese Zeile sammelt alle bereits belegten Labelbereiche.
  const occupiedLabelRectangles: OverlayRectangle[] = [];

  // Diese Zeile sammelt alle Boxrechtecke als geschützte Bildbereiche.
  const blockedObjectRectangles = positionedBoxEntries.map((positionedBoxEntry) => positionedBoxEntry.boxRectangle);

  // Diese Zeile berechnet für jede Erkennung zusätzlich eine freie Labelposition.
  return positionedBoxEntries.map((positionedBoxEntry) => {
    // Diese Zeile schätzt die Breite des Labels.
    const currentLabelWidth = estimateLabelWidth(positionedBoxEntry.label);

    // Diese Zeile entfernt das eigene Boxrechteck aus den blockierten Bereichen.
    const otherBlockedObjectRectangles = blockedObjectRectangles.filter(
      (blockedObjectRectangle) => blockedObjectRectangle !== positionedBoxEntry.boxRectangle
    );

    // Diese Zeile sucht eine freie Labelposition.
    const labelRectangle = findFreeLabelRectangle(
      canvasWidth,
      canvasHeight,
      positionedBoxEntry.boxRectangle,
      currentLabelWidth,
      occupiedLabelRectangles,
      otherBlockedObjectRectangles
    );

    // Diese Zeile merkt sich die belegte Labelposition.
    occupiedLabelRectangles.push(labelRectangle);

    // Diese Zeile berechnet die Verbindungslinie.
    const connectorLine = createConnectorLine(labelRectangle, positionedBoxEntry.boxRectangle);

    // Diese Zeile gibt die vollständig positionierte Erkennung zurück.
    return {
      id: positionedBoxEntry.id,
      label: positionedBoxEntry.label,
      boxRectangle: positionedBoxEntry.boxRectangle,
      labelRectangle,
      connectorLine
    };
  });
}


// Diese Funktion rendert im Web immer Box und Label daneben ohne Marker.
export function BoundingBoxOverlay(properties: BoundingBoxOverlayProperties): React.JSX.Element | null {
  // Diese Zeile prüft, ob gültige Canvasmaße vorhanden sind.
  if (properties.canvasWidth <= 0 || properties.canvasHeight <= 0) {
    // Diese Zeile rendert noch nichts, solange die Bildfläche unbekannt ist.
    return null;
  }

  // Diese Zeile prüft, ob gültige Ursprungsmaße vorhanden sind.
  if (properties.sourceImageWidth <= 0 || properties.sourceImageHeight <= 0) {
    // Diese Zeile rendert noch nichts, wenn die Ursprungsmaße fehlen.
    return null;
  }

  // Diese Zeile berechnet alle sichtbaren Positionen.
  const positionedDetections = createPositionedDetections(
    properties.detections,
    properties.sourceImageWidth,
    properties.sourceImageHeight,
    properties.canvasWidth,
    properties.canvasHeight
  );

  // Diese Zeile gibt den Overlay-Container zurück.
  return (
    // Diese Zeile rendert den Overlay-Container exakt in der Größe der sichtbaren Bildfläche.
    <View pointerEvents="none" style={styles.overlayContainer}>
      {/* Diese Zeile rendert für jede Erkennung Box, Linie und Label. */}
      {positionedDetections.map((positionedDetection) => {
        // Diese Zeile berechnet die sichtbare Breite der Box.
        const boxWidth =
          positionedDetection.boxRectangle.right - positionedDetection.boxRectangle.left;

        // Diese Zeile berechnet die sichtbare Höhe der Box.
        const boxHeight =
          positionedDetection.boxRectangle.bottom - positionedDetection.boxRectangle.top;

        // Diese Zeile gibt die UI der aktuellen Erkennung zurück.
        return (
          // Diese Zeile gruppiert alle sichtbaren Elemente der Erkennung.
          <React.Fragment key={positionedDetection.id}>
            {/* Diese Zeile rendert immer eine echte Bounding Box. */}
            <View
              style={[
                styles.boundingBox,
                {
                  left: positionedDetection.boxRectangle.left,
                  top: positionedDetection.boxRectangle.top,
                  width: boxWidth,
                  height: boxHeight
                }
              ]}
            />

      

            {/* Diese Zeile rendert den Label-Hintergrund neben der Box. */}
            <View
              style={[
                styles.boundingBoxLabelContainer,
                {
                  left: positionedDetection.labelRectangle.left,
                  top: positionedDetection.labelRectangle.top,
                  width:
                    positionedDetection.labelRectangle.right - positionedDetection.labelRectangle.left,
                  height:
                    positionedDetection.labelRectangle.bottom - positionedDetection.labelRectangle.top
                }
              ]}
            >
              {/* Diese Zeile zeigt den Schildnamen an. */}
              <Text numberOfLines={1} style={styles.boundingBoxLabelText}>
                {positionedDetection.label}
              </Text>
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
}


// Diese Konstante enthält alle Styles des Web-Overlays.
const styles = StyleSheet.create({
  // Diese Regel gestaltet den Overlay-Container.
  overlayContainer: {
    // Diese Zeile positioniert das Overlay absolut.
    position: 'absolute',

    // Diese Zeile setzt die linke Kante.
    left: 0,

    // Diese Zeile setzt die rechte Kante.
    right: 0,

    // Diese Zeile setzt die obere Kante.
    top: 0,

    // Diese Zeile setzt die untere Kante.
    bottom: 0
  },

  // Diese Regel gestaltet die sichtbare Bounding Box.
  boundingBox: {
    // Diese Zeile positioniert die Box absolut.
    position: 'absolute',

    // Diese Zeile setzt die gelbe Randfarbe.
    borderColor: '#FFD54F',

    // Diese Zeile setzt die Randbreite.
    borderWidth: 3,

    // Diese Zeile färbt die Box innen leicht transparent ein.
    backgroundColor: 'rgba(255, 213, 79, 0.18)',

    // Diese Zeile rundet die Ecken leicht ab.
    borderRadius: 6
  },

  // Diese Regel gestaltet die Verbindungslinie.
  connectorLine: {
    // Diese Zeile positioniert die Linie absolut.
    position: 'absolute',

    // Diese Zeile setzt die Höhe der Linie.
    height: 2,

    // Diese Zeile setzt die gelbe Farbe der Linie.
    backgroundColor: '#FFD54F'
  },

  // Diese Regel gestaltet den Label-Hintergrund.
  boundingBoxLabelContainer: {
    // Diese Zeile positioniert das Label absolut.
    position: 'absolute',

    // Diese Zeile setzt die gelbe Hintergrundfarbe.
    backgroundColor: '#FFD54F',

    // Diese Zeile richtet den Inhalt vertikal mittig aus.
    justifyContent: 'center',

    // Diese Zeile setzt horizontalen Innenabstand.
    paddingHorizontal: 8,

    // Diese Zeile rundet die Ecken leicht ab.
    borderRadius: 6,

    // Diese Zeile zeichnet einen feinen dunkleren Rand.
    borderWidth: 1,

    // Diese Zeile setzt die Randfarbe.
    borderColor: '#C89F00'
  },

  // Diese Regel gestaltet den Text im Label.
  boundingBoxLabelText: {
    // Diese Zeile setzt die Textfarbe.
    color: '#1B1B1B',

    // Diese Zeile setzt die Schriftgröße.
    fontSize: 12,

    // Diese Zeile macht den Text gut lesbar.
    fontWeight: '700'
  }
});