// Diese Zeile importiert den Typ für einen Workflow-Schritt.
import { ApplicationWorkflowStep } from '../types/applicationWorkflowStep';


// Diese Funktion liefert alle vorbereiteten Workflow-Schritte der Anwendung.
export function loadApplicationWorkflowSteps(): ApplicationWorkflowStep[] {
  // Diese Zeile gibt die Liste der Workflow-Schritte zurück.
  return [
    // Diese Zeile beschreibt den ersten Schritt der Anwendung.
    {
      // Diese Zeile definiert die eindeutige Kennung des ersten Schritts.
      id: 'open-home-screen',
      // Diese Zeile definiert die sichtbare Nummer des ersten Schritts.
      stepNumber: 1,
      // Diese Zeile definiert den Titel des ersten Schritts.
      title: 'Open the home screen',
      // Diese Zeile beschreibt den ersten Schritt verständlich.
      description: 'The person opens the app and sees the actions for taking a photo, picking an image later and opening the history.'
    },
    // Diese Zeile beschreibt den zweiten Schritt der Anwendung.
    {
      // Diese Zeile definiert die eindeutige Kennung des zweiten Schritts.
      id: 'request-camera-permission',
      // Diese Zeile definiert die sichtbare Nummer des zweiten Schritts.
      stepNumber: 2,
      // Diese Zeile definiert den Titel des zweiten Schritts.
      title: 'Request camera permission',
      // Diese Zeile beschreibt den zweiten Schritt verständlich.
      description: 'When the person taps Take Photo, the app requests camera access from the operating system.'
    },
    // Diese Zeile beschreibt den dritten Schritt der Anwendung.
    {
      // Diese Zeile definiert die eindeutige Kennung des dritten Schritts.
      id: 'open-camera',
      // Diese Zeile definiert die sichtbare Nummer des dritten Schritts.
      stepNumber: 3,
      // Diese Zeile definiert den Titel des dritten Schritts.
      title: 'Open the camera',
      // Diese Zeile beschreibt den dritten Schritt verständlich.
      description: 'If permission is granted, the system camera opens and the person can capture exactly one image.'
    },
    // Diese Zeile beschreibt den vierten Schritt der Anwendung.
    {
      // Diese Zeile definiert die eindeutige Kennung des vierten Schritts.
      id: 'read-captured-image-uri',
      // Diese Zeile definiert die sichtbare Nummer des vierten Schritts.
      stepNumber: 4,
      // Diese Zeile definiert den Titel des vierten Schritts.
      title: 'Read the captured image URI',
      // Diese Zeile beschreibt den vierten Schritt verständlich.
      description: 'After the photo is captured, the app reads the local URI of the returned image asset.'
    },
    // Diese Zeile beschreibt den fünften Schritt der Anwendung.
    {
      // Diese Zeile definiert die eindeutige Kennung des fünften Schritts.
      id: 'navigate-to-image-review',
      // Diese Zeile definiert die sichtbare Nummer des fünften Schritts.
      stepNumber: 5,
      // Diese Zeile definiert den Titel des fünften Schritts.
      title: 'Navigate to image review',
      // Diese Zeile beschreibt den fünften Schritt verständlich.
      description: 'The HomeScreen navigates to the ImageReviewScreen and passes the captured image URI as a typed parameter.'
    },
    // Diese Zeile beschreibt den sechsten Schritt der Anwendung.
    {
      // Diese Zeile definiert die eindeutige Kennung des sechsten Schritts.
      id: 'continue-detection-flow',
      // Diese Zeile definiert die sichtbare Nummer des sechsten Schritts.
      stepNumber: 6,
      // Diese Zeile definiert den Titel des sechsten Schritts.
      title: 'Continue the detection flow',
      // Diese Zeile beschreibt den sechsten Schritt verständlich.
      description: 'On the review screen the person can continue with the next ticket steps of the traffic sign detection process.'
    }
  ];
}