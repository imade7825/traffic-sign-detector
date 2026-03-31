// Diese Zeile importiert Expo Constants zum Lesen der App-Konfiguration.
import Constants from "expo-constants";

// Diese Zeile importiert den Antworttyp der Detection-API.
import type { DetectionApiResponse } from "../types/applicationNavigation";

// Diese Funktion liest die Backend-Basisadresse aus der Expo-Konfiguration.
function readBackendBaseUrl(): string {
  // Diese Zeile liest die zusätzlichen Konfigurationswerte aus Expo Constants.
  const applicationExtraConfiguration = Constants.expoConfig?.extra;

  // Diese Zeile liest die Backend-Adresse aus der Konfiguration.
  const configuredBackendBaseUrl =
    applicationExtraConfiguration?.backendBaseUrl;

  // Diese Zeile prüft, ob eine gültige Backend-Adresse vorhanden ist.
  if (
    typeof configuredBackendBaseUrl !== "string" ||
    configuredBackendBaseUrl.length === 0
  ) {
    // Diese Zeile wirft einen Fehler bei fehlender Backend-Adresse.
    throw new Error("Backend base URL is not configured.");
  }

  // Diese Zeile gibt die gefundene Backend-Adresse zurück.
  return configuredBackendBaseUrl;
}

// Diese Funktion bestimmt einen sinnvollen Dateinamen für den Upload.
function createImageFileName(imageUri: string): string {
  // Diese Zeile liest den letzten Pfadteil der URI aus.
  const uriPathParts = imageUri.split("/");

  // Diese Zeile liest den Dateinamen aus dem letzten Pfadteil.
  const extractedFileName = uriPathParts[uriPathParts.length - 1];

  // Diese Zeile prüft, ob ein brauchbarer Dateiname vorhanden ist.
  if (typeof extractedFileName === "string" && extractedFileName.length > 0) {
    // Diese Zeile gibt den gefundenen Dateinamen zurück.
    return extractedFileName;
  }

  // Diese Zeile gibt einen Standarddateinamen zurück.
  return "traffic-sign-image.jpg";
}

// Diese Funktion bestimmt einen MIME-Type anhand des Dateinamens.
function createImageMimeType(imageFileName: string): string {
  // Diese Zeile erstellt eine kleingeschriebene Version des Dateinamens.
  const lowerCaseFileName = imageFileName.toLowerCase();

  // Diese Zeile prüft, ob es sich um eine PNG-Datei handelt.
  if (lowerCaseFileName.endsWith(".png")) {
    // Diese Zeile gibt den PNG-MIME-Type zurück.
    return "image/png";
  }

  // Diese Zeile prüft, ob es sich um eine JPEG-Datei handelt.
  if (lowerCaseFileName.endsWith(".jpeg")) {
    // Diese Zeile gibt den JPEG-MIME-Type zurück.
    return "image/jpeg";
  }

  // Diese Zeile gibt standardmäßig JPEG zurück.
  return "image/jpeg";
}

// Diese Funktion lädt ein Bild als multipart form-data hoch und gibt die Detection-Antwort zurück.
export async function analyzeImageWithBackend(
  imageUri: string
): Promise<DetectionApiResponse> {
  // Diese Zeile liest die Basisadresse des Backends.
  const backendBaseUrl = readBackendBaseUrl();

  // Diese Zeile bestimmt einen Dateinamen für den Upload.
  const imageFileName = createImageFileName(imageUri);

  // Diese Zeile bestimmt den passenden MIME-Type.
  const imageMimeType = createImageMimeType(imageFileName);

  // Diese Zeile erstellt das FormData-Objekt für den Upload.
  const multipartFormData = new FormData();

  // Diese Zeile definiert die hochzuladende Datei für React Native.
  const imageFile = {
    // Diese Zeile setzt die Bildadresse.
    uri: imageUri,
    // Diese Zeile setzt den Dateinamen.
    name: imageFileName,
    // Diese Zeile setzt den MIME-Type.
    type: imageMimeType,
  };

  // Diese Zeile hängt die Datei an das multipart-Formular an.
  multipartFormData.append("file", imageFile as never);

  // Diese Zeile schreibt die Zieladresse für die Fehlersuche in die Konsole.
  console.log("Using backend URL:", backendBaseUrl);

  // Diese Zeile schreibt die Bildadresse für die Fehlersuche in die Konsole.
  console.log("Uploading image URI:", imageUri);

  // Diese Zeile sendet die POST-Anfrage an den Detection-Endpunkt.
  const response = await fetch(`${backendBaseUrl}/detect`, {
    // Diese Zeile setzt die HTTP-Methode.
    method: "POST",
    // Diese Zeile übergibt den multipart-Body.
    body: multipartFormData,
  });

  // Diese Zeile prüft, ob die Anfrage erfolgreich war.
  if (!response.ok) {
    // Diese Zeile liest den Antworttext des Backends für die Fehlersuche.
    const errorText = await response.text();

    // Diese Zeile schreibt den Backend-Fehler in die Konsole.
    console.error("Detection backend error:", errorText);

    // Diese Zeile wirft einen Fehler mit Statuscode und Text.
    throw new Error(
      `Detection request failed with status ${response.status}: ${errorText}`
    );
  }

  // Diese Zeile liest die JSON-Antwort des Backends.
  const detectionResponse = (await response.json()) as DetectionApiResponse;

  // Diese Zeile gibt die geparste Antwort zurück.
  return detectionResponse;
}
