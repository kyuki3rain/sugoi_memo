declare global {
  interface Window {
    myAPI: Sandbox;
  }
}

export interface Sandbox {
  loadText: () => string;
  saveText: (text: string) => void;
}
