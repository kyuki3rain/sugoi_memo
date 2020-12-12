declare global {
  interface Window {
    myAPI: Sandbox;
  }
}

export interface Sandbox {
  loadText: (filename: string) => string;
  backup: (filename: string, text: string) => void;
  open: () => string;
  load: (filename: string) => string;
  new: (filename: string) => string;
  save: (filename: string, text: string) => string;
}
