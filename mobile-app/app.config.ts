// Diese Zeile importiert den Typ für die Expo-Konfiguration.
import { ExpoConfig } from 'expo/config';

// Diese Konstante enthält die zentrale Konfiguration der Anwendung.
const applicationConfiguration: ExpoConfig = {
  // Diese Zeile definiert den sichtbaren Namen der Anwendung.
  name: 'Traffic Sign Detector',

  // Diese Zeile definiert den technischen Projektnamen.
  slug: 'traffic-sign-detector',

  // Diese Zeile legt fest, auf welchen Plattformen die App laufen kann.
  platforms: ['android', 'ios', 'web'],

  // Diese Zeile aktiviert die automatische Anpassung an hellen oder dunklen Modus.
  userInterfaceStyle: 'automatic',

  // Diese Zeile setzt das allgemeine App-Icon für das Projekt.
  icon: './assets/images/traffic-sign-logo.png',

  // Diese Zeile definiert Android-spezifische Einstellungen.
  android: {
    // Diese Zeile setzt ein Android-spezifisches Fallback-Icon.
    icon: './assets/images/traffic-sign-logo.png',

    // Diese Zeile definiert das Adaptive Icon für Android.
    adaptiveIcon: {
      // Diese Zeile setzt das Vordergrundbild des Android-Icons.
      foregroundImage: './assets/images/traffic-sign-logo.png',

      // Diese Zeile setzt die Hintergrundfarbe des Android-Icons.
      backgroundColor: '#FFFFFF'
    }
  },

  // Diese Zeile registriert Build-Time-Plugins der Anwendung.
  plugins: [
    // Diese Zeile registriert das Image-Picker-Plugin mit Projektoptionen.
    [
      'expo-image-picker',
      {
        // Diese Zeile hinterlegt die Kamera-Berechtigung für native Builds.
        cameraPermission: 'Camera access is required to take a photo.',

        // Diese Zeile hinterlegt die Fotobibliothek-Berechtigung für native iOS-Builds.
        photosPermission: 'Gallery access is required to choose an image.',

        // Diese Zeile deaktiviert die Mikrofon-Berechtigung, weil keine Videos aufgenommen werden.
        microphonePermission: false
      }
    ]
  ],

  // Diese Zeile speichert zusätzliche Werte für die Anwendung.
  extra: {
    // Diese Zeile speichert die Standardadresse des Backends für den Android-Emulator.
    backendBaseUrl: 'http://10.0.2.2:8000'
  }
};

// Diese Zeile exportiert die Konfiguration der Anwendung.
export default applicationConfiguration;