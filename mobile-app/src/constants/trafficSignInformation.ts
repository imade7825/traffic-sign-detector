// Diese Typdefinition beschreibt lokale Zusatzinformationen zu einem Verkehrszeichen.
type TrafficSignInformation = {
  // Diese Zeile definiert die verständliche Bedeutung des Verkehrszeichens.
  meaning: string;
};


// Diese Konstante enthält die lokalen Zusatzinformationen zu allen bekannten Verkehrszeichen.
const trafficSignInformationByLabel: Record<string, TrafficSignInformation> = {
  // Diese Zeile definiert die Bedeutung für das Tempolimit 20.
  'Speed limit (20km/h)': { meaning: 'Maximum speed 20 km/h.' },

  // Diese Zeile definiert die Bedeutung für das Tempolimit 30.
  'Speed limit (30km/h)': { meaning: 'Maximum speed 30 km/h.' },

  // Diese Zeile definiert die Bedeutung für das Tempolimit 50.
  'Speed limit (50km/h)': { meaning: 'Maximum speed 50 km/h.' },

  // Diese Zeile definiert die Bedeutung für das Tempolimit 60.
  'Speed limit (60km/h)': { meaning: 'Maximum speed 60 km/h.' },

  // Diese Zeile definiert die Bedeutung für das Tempolimit 70.
  'Speed limit (70km/h)': { meaning: 'Maximum speed 70 km/h.' },

  // Diese Zeile definiert die Bedeutung für das Tempolimit 80.
  'Speed limit (80km/h)': { meaning: 'Maximum speed 80 km/h.' },

  // Diese Zeile definiert die Bedeutung für das Ende des Tempolimits 80.
  'End of speed limit (80km/h)': { meaning: 'The 80 km/h speed limit ends here.' },

  // Diese Zeile definiert die Bedeutung für das Tempolimit 100.
  'Speed limit (100km/h)': { meaning: 'Maximum speed 100 km/h.' },

  // Diese Zeile definiert die Bedeutung für das Tempolimit 120.
  'Speed limit (120km/h)': { meaning: 'Maximum speed 120 km/h.' },

  // Diese Zeile definiert die Bedeutung für das Überholverbot.
  'No passing': { meaning: 'Overtaking is prohibited.' },

  // Diese Zeile definiert die Bedeutung für das Überholverbot für schwere Fahrzeuge.
  'No passing for vehicles over 3.5 metric tons': { meaning: 'Vehicles over 3.5 metric tons may not overtake.' },

  // Diese Zeile definiert die Bedeutung für Vorfahrt an der nächsten Kreuzung.
  'Right-of-way at the next intersection': { meaning: 'You have priority at the next intersection.' },

  // Diese Zeile definiert die Bedeutung für Vorfahrtsstraße.
  'Priority road': { meaning: 'You are on a priority road.' },

  // Diese Zeile definiert die Bedeutung für Vorfahrt gewähren.
  'Yield': { meaning: 'Slow down and yield to other traffic.' },

  // Diese Zeile definiert die Bedeutung für Stop.
  'Stop': { meaning: 'Come to a complete stop before continuing.' },

  // Diese Zeile definiert die Bedeutung für Fahrverbot für alle Fahrzeuge.
  'No vehicles': { meaning: 'All vehicles are prohibited.' },

  // Diese Zeile definiert die Bedeutung für Verbot für schwere Fahrzeuge.
  'Vehicles over 3.5 metric tons prohibited': { meaning: 'Vehicles over 3.5 metric tons are prohibited.' },

  // Diese Zeile definiert die Bedeutung für Einfahrt verboten.
  'No entry': { meaning: 'Entry is prohibited.' },

  // Diese Zeile definiert die Bedeutung für allgemeine Gefahr.
  'General caution': { meaning: 'Proceed carefully. A hazard is ahead.' },

  // Diese Zeile definiert die Bedeutung für gefährliche Linkskurve.
  'Dangerous curve to the left': { meaning: 'A dangerous left curve is ahead.' },

  // Diese Zeile definiert die Bedeutung für gefährliche Rechtskurve.
  'Dangerous curve to the right': { meaning: 'A dangerous right curve is ahead.' },

  // Diese Zeile definiert die Bedeutung für Doppelkurve.
  'Double curve': { meaning: 'A double curve is ahead.' },

  // Diese Zeile definiert die Bedeutung für unebene Fahrbahn.
  'Bumpy road': { meaning: 'The road surface ahead is uneven.' },

  // Diese Zeile definiert die Bedeutung für rutschige Fahrbahn.
  'Slippery road': { meaning: 'The road may be slippery.' },

  // Diese Zeile definiert die Bedeutung für Fahrbahnverengung rechts.
  'Road narrows on the right': { meaning: 'The road narrows on the right side.' },

  // Diese Zeile definiert die Bedeutung für Baustelle.
  'Road work': { meaning: 'Road work is ahead.' },

  // Diese Zeile definiert die Bedeutung für Lichtzeichenanlage.
  'Traffic signals': { meaning: 'Traffic signals are ahead.' },

  // Diese Zeile definiert die Bedeutung für Fußgänger.
  'Pedestrians': { meaning: 'Watch for pedestrians.' },

  // Diese Zeile definiert die Bedeutung für Kinder.
  'Children crossing': { meaning: 'Watch for children crossing.' },

  // Diese Zeile definiert die Bedeutung für Fahrräder.
  'Bicycles crossing': { meaning: 'Watch for bicycles crossing.' },

  // Diese Zeile definiert die Bedeutung für Eis oder Schnee.
  'Beware of ice/snow': { meaning: 'There may be ice or snow on the road.' },

  // Diese Zeile definiert die Bedeutung für Wildwechsel.
  'Wild animals crossing': { meaning: 'Watch for wild animals crossing.' },

  // Diese Zeile definiert die Bedeutung für das Ende aller Beschränkungen.
  'End of all speed and passing limits': { meaning: 'Previous speed and passing restrictions end here.' },

  // Diese Zeile definiert die Bedeutung für Rechtsabbiegen.
  'Turn right ahead': { meaning: 'Turn right ahead.' },

  // Diese Zeile definiert die Bedeutung für Linksabbiegen.
  'Turn left ahead': { meaning: 'Turn left ahead.' },

  // Diese Zeile definiert die Bedeutung für geradeaus.
  'Ahead only': { meaning: 'Proceed straight ahead only.' },

  // Diese Zeile definiert die Bedeutung für geradeaus oder rechts.
  'Go straight or right': { meaning: 'You may go straight ahead or turn right.' },

  // Diese Zeile definiert die Bedeutung für geradeaus oder links.
  'Go straight or left': { meaning: 'You may go straight ahead or turn left.' },

  // Diese Zeile definiert die Bedeutung für rechts halten.
  'Keep right': { meaning: 'Pass the obstacle on the right.' },

  // Diese Zeile definiert die Bedeutung für links halten.
  'Keep left': { meaning: 'Pass the obstacle on the left.' },

  // Diese Zeile definiert die Bedeutung für Kreisverkehr.
  'Roundabout mandatory': { meaning: 'Enter and follow the roundabout.' },

  // Diese Zeile definiert die Bedeutung für Ende des Überholverbots.
  'End of no passing': { meaning: 'The no passing restriction ends here.' },

  // Diese Zeile definiert die Bedeutung für Ende des Überholverbots für schwere Fahrzeuge.
  'End of no passing by vehicles over 3.5 metric tons': { meaning: 'The no passing restriction for heavy vehicles ends here.' }
};


// Diese Funktion liest die lokale Bedeutung eines Verkehrszeichens aus.
export function readTrafficSignMeaning(label: string): string {
  // Diese Zeile liest die Zusatzinformationen für das Label aus.
  const trafficSignInformation = trafficSignInformationByLabel[label];

  // Diese Zeile prüft, ob das Label bekannt ist.
  if (trafficSignInformation) {
    // Diese Zeile gibt die bekannte Bedeutung zurück.
    return trafficSignInformation.meaning;
  }

  // Diese Zeile gibt einen Fallback zurück, wenn keine lokale Bedeutung vorhanden ist.
  return 'Meaning not available.';
}