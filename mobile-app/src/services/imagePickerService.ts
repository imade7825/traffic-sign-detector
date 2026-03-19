// Diese Zeile importiert den Alert-Baustein aus React Native.
import { Alert } from 'react-native';

// Diese Zeile importiert alle Funktionen des Expo Image Pickers.
import * as ImagePicker from 'expo-image-picker';


// Diese Funktion fragt die Kamera-Berechtigung an und liefert die URI eines aufgenommenen Bildes zurück.
export async function takePhotoAndReturnImageUri(): Promise<string | null> {
  // Diese Zeile fragt die Kamera-Berechtigung beim Betriebssystem an.
  const cameraPermissionResponse = await ImagePicker.requestCameraPermissionsAsync();

  // Diese Zeile prüft, ob die Kamera-Berechtigung verweigert wurde.
  if (!cameraPermissionResponse.granted) {
    // Diese Zeile zeigt einen klaren Hinweis bei verweigerter Berechtigung an.
    Alert.alert('Permission denied', 'Camera access is required to take a photo.');

    // Diese Zeile beendet die Funktion ohne Bild-URI.
    return null;
  }

  // Diese Zeile öffnet die System-Kamera für genau eine Bildaufnahme.
  const imagePickerResult = await ImagePicker.launchCameraAsync({
    // Diese Zeile erlaubt nur Bilddateien.
    mediaTypes: ['images'],
    // Diese Zeile deaktiviert die Bearbeitungsoberfläche für dieses Ticket.
    allowsEditing: false,
    // Diese Zeile fordert die beste Bildqualität an.
    quality: 1
  });

  // Diese Zeile prüft, ob der Benutzer die Kamera ohne Foto geschlossen hat.
  if (imagePickerResult.canceled) {
    // Diese Zeile beendet die Funktion ohne Bild-URI.
    return null;
  }

  // Diese Zeile liest das erste aufgenommene Bild aus dem Ergebnis.
  const capturedImageAsset = imagePickerResult.assets?.[0];

  // Diese Zeile prüft, ob wirklich ein Bildobjekt vorhanden ist.
  if (!capturedImageAsset?.uri) {
    // Diese Zeile beendet die Funktion ohne Bild-URI.
    return null;
  }

  // Diese Zeile gibt die URI des aufgenommenen Bildes zurück.
  return capturedImageAsset.uri;
}


// Diese Funktion fragt die Galerie-Berechtigung an und liefert die URI eines ausgewählten Bildes zurück.
export async function pickImageFromGalleryAndReturnImageUri(): Promise<string | null> {
  // Diese Zeile fragt die Galerie-Berechtigung beim Betriebssystem an.
  const mediaLibraryPermissionResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();

  // Diese Zeile prüft, ob die Galerie-Berechtigung verweigert wurde.
  if (!mediaLibraryPermissionResponse.granted) {
    // Diese Zeile zeigt einen klaren Hinweis bei verweigerter Berechtigung an.
    Alert.alert('Permission denied', 'Gallery access is required to choose an image.');

    // Diese Zeile beendet die Funktion ohne Bild-URI.
    return null;
  }

  // Diese Zeile öffnet die System-Galerie für genau eine Bildauswahl.
  const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
    // Diese Zeile erlaubt nur Bilddateien.
    mediaTypes: ['images'],
    // Diese Zeile erzwingt, dass nicht mehrere Bilder ausgewählt werden.
    allowsMultipleSelection: false,
    // Diese Zeile deaktiviert die Bearbeitungsoberfläche für dieses Ticket.
    allowsEditing: false,
    // Diese Zeile fordert die beste Bildqualität an.
    quality: 1
  });

  // Diese Zeile prüft, ob der Benutzer die Galerie ohne Auswahl geschlossen hat.
  if (imagePickerResult.canceled) {
    // Diese Zeile beendet die Funktion ohne Bild-URI.
    return null;
  }

  // Diese Zeile liest das erste ausgewählte Bild aus dem Ergebnis.
  const selectedImageAsset = imagePickerResult.assets?.[0];

  // Diese Zeile prüft, ob wirklich ein Bildobjekt vorhanden ist.
  if (!selectedImageAsset?.uri) {
    // Diese Zeile beendet die Funktion ohne Bild-URI.
    return null;
  }

  // Diese Zeile gibt die URI des ausgewählten Bildes zurück.
  return selectedImageAsset.uri;
}