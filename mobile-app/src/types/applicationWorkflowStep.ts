// Diese Typdefinition beschreibt einen einzelnen Schritt im geplanten App-Workflow.
export type ApplicationWorkflowStep = {
  // Diese Zeile definiert eine eindeutige Kennung.
  id: string;
  // Diese Zeile definiert die sichtbare Reihenfolge des Schritts.
  stepNumber: number;
  // Diese Zeile definiert den kurzen Titel des Schritts.
  title: string;
  // Diese Zeile definiert die verständliche Beschreibung des Schritts.
  description: string;
};