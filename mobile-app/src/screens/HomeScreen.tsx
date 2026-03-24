// Diese Zeile importiert React, damit wir eine Funktionskomponente schreiben können.
import React from 'react';

// Diese Zeile importiert die benötigten Bausteine aus React Native.
import { Image, StyleSheet, Text, View } from 'react-native';

// Diese Zeile importiert die Safe-Area-Ansicht.
import { SafeAreaView } from 'react-native-safe-area-context';

// Diese Zeile importiert den wiederverwendbaren Aktionsbutton.
import { ScreenActionButton } from '../components/ScreenActionButton';

// Diese Zeile importiert die Metadaten der Anwendung.
import { applicationMetadata } from '../config/applicationConfiguration';

// Diese Zeile importiert die Farbpalette der Anwendung.
import { colorPalette } from '../constants/colorPalette';

// Diese Zeile importiert die wiederverwendbaren Abstände und Größen.
import { layoutValues } from '../constants/layoutValues';

// Diese Zeile importiert den Service für die Kameraaufnahme und die Galerieauswahl.
import {
  pickImageFromGalleryAndReturnImageUri,
  takePhotoAndReturnImageUri
} from '../services/imagePickerService';

// Diese Zeile importiert die typisierten Eigenschaften des Startbildschirms.
import type { HomeScreenProperties } from '../types/applicationNavigation';


// Diese Funktion rendert den Startbildschirm der Anwendung.
export function HomeScreen({ navigation }: HomeScreenProperties): React.JSX.Element {
  // Diese Funktion öffnet die Kamera und navigiert danach zum Bildprüfungsbildschirm.
  async function handleTakePhoto(): Promise<void> {
    // Diese Zeile ruft die Kameraaufnahme über den Service auf.
    const capturedImageUri = await takePhotoAndReturnImageUri();

    // Diese Zeile prüft, ob ein Bild erfolgreich aufgenommen wurde.
    if (!capturedImageUri) {
      // Diese Zeile beendet die Funktion ohne Navigation.
      return;
    }

    // Diese Zeile navigiert mit der Bild-URI zum Bildprüfungsbildschirm.
    navigation.navigate('ImageReviewScreen', {
      // Diese Zeile übergibt die URI des aufgenommenen Bildes.
      imageUri: capturedImageUri
    });
  }

  // Diese Funktion öffnet die Galerie und navigiert danach zum Bildprüfungsbildschirm.
  async function handlePickImage(): Promise<void> {
    // Diese Zeile ruft die Galerieauswahl über den Service auf.
    const selectedImageUri = await pickImageFromGalleryAndReturnImageUri();

    // Diese Zeile prüft, ob ein Bild erfolgreich ausgewählt wurde.
    if (!selectedImageUri) {
      // Diese Zeile beendet die Funktion ohne Navigation.
      return;
    }

    // Diese Zeile navigiert mit der Bild-URI zum Bildprüfungsbildschirm.
    navigation.navigate('ImageReviewScreen', {
      // Diese Zeile übergibt die URI des ausgewählten Bildes.
      imageUri: selectedImageUri
    });
  }

  // Diese Funktion öffnet den Verlaufsbildschirm.
  function handleOpenHistoryScreen(): void {
    // Diese Zeile navigiert zum Verlaufsbildschirm.
    navigation.navigate('HistoryScreen');
  }

  // Diese Zeile gibt die gesamte Benutzeroberfläche des Startbildschirms zurück.
  return (
    // Diese Zeile sorgt dafür, dass der Bildschirm die sicheren Ränder des Geräts beachtet.
    <SafeAreaView style={styles.safeArea}>
      {/* Diese Zeile gruppiert den gesamten sichtbaren Inhalt. */}
      <View style={styles.contentContainer}>
        {/* Diese Zeile rendert den Logo-Bereich über der Überschrift. */}
        <View style={styles.logoContainer}>
          {/* Diese Zeile zeigt das lokale Logo-Bild an. */}
          <Image
            // Diese Zeile lädt das Logo aus dem assets-Ordner.
            source={require('../../assets/images/traffic-sign-logo.png')}
            // Diese Zeile verwendet den Stil für das Logo.
            style={styles.logoImage}
            // Diese Zeile sorgt dafür, dass das Bild nicht verzerrt wird.
            resizeMode="contain"
          />
        </View>

        {/* Diese Zeile zeigt die Hauptüberschrift des Bildschirms an. */}
        <Text style={styles.screenTitle}>{applicationMetadata.applicationName}</Text>

        {/* Diese Zeile rendert den Button für die Kameraaufnahme. */}
        <ScreenActionButton
          // Diese Zeile setzt den sichtbaren Text des Buttons.
          title="Take Photo"
          // Diese Zeile verbindet den Button mit der asynchronen Kamera-Funktion.
          onPress={() => {
            // Diese Zeile startet die asynchrone Kamera-Funktion ohne Rückgabewert im UI-Kontext.
            void handleTakePhoto();
          }}
        />

        {/* Diese Zeile rendert den Button für die Galerieauswahl. */}
        <ScreenActionButton
          // Diese Zeile setzt den sichtbaren Text des Buttons.
          title="Pick Image"
          // Diese Zeile verbindet den Button mit der asynchronen Galerie-Funktion.
          onPress={() => {
            // Diese Zeile startet die asynchrone Galerie-Funktion ohne Rückgabewert im UI-Kontext.
            void handlePickImage();
          }}
        />

        {/* Diese Zeile rendert den Button zum Verlaufsbildschirm. */}
        <ScreenActionButton
          // Diese Zeile setzt den sichtbaren Text des Buttons.
          title="View History"
          // Diese Zeile verbindet den Button mit der Navigationsfunktion.
          onPress={handleOpenHistoryScreen}
        />
      </View>
    </SafeAreaView>
  );
}


// Diese Konstante enthält alle Styles des Home Screens.
const styles = StyleSheet.create({
  // Diese Regel gestaltet die sichere äußere Fläche des Bildschirms.
  safeArea: {
    // Diese Zeile setzt die Haupt-Hintergrundfarbe.
    backgroundColor: colorPalette.backgroundPrimary,
    // Diese Zeile lässt die Fläche den ganzen Bildschirm füllen.
    flex: 1
  },

  // Diese Regel gestaltet den inneren Hauptcontainer des Bildschirms.
  contentContainer: {
    // Diese Zeile lässt den Container den verfügbaren Platz ausfüllen.
    flex: 1,
    // Diese Zeile richtet den Inhalt vertikal mittig aus.
    justifyContent: 'center',
    // Diese Zeile erzeugt horizontalen Abstand.
    paddingHorizontal: layoutValues.extraLarge
  },

  // Diese Regel gestaltet den äußeren Logo-Bereich.
  logoContainer: {
    // Diese Zeile richtet den Inhalt mittig aus.
    alignItems: 'center',
    // Diese Zeile erzeugt Abstand unterhalb des Logos.
    marginBottom: layoutValues.large
  },

  // Diese Regel gestaltet das Bildlogo.
  logoImage: {
    // Diese Zeile setzt die Breite des Logos.
    width: 140,
    // Diese Zeile setzt die Höhe des Logos.
    height: 140
  },

  // Diese Regel gestaltet die Hauptüberschrift.
  screenTitle: {
    // Diese Zeile setzt eine große Schriftgröße.
    fontSize: 28,
    // Diese Zeile macht die Überschrift deutlich fett.
    fontWeight: '700',
    // Diese Zeile setzt die Haupttextfarbe.
    color: colorPalette.textPrimary,
    // Diese Zeile richtet den Text mittig aus.
    textAlign: 'center',
    // Diese Zeile erzeugt Abstand nach unten.
    marginBottom: layoutValues.extraLarge
  }
});