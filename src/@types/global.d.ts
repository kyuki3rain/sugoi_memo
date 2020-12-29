declare global {
  interface Window {
    myAPI: Sandbox;
  }
}

export interface Sandbox {
  backup: (filename: string, text: string) => void;
  list: () => string[];
  exit: () => void;
  openFile: () => string;
  open: (filename: string) => string;
  load: (filename: string) => string;
  loadLog: (filename: string, num: number) => string;
  save: (filename: string) => string;
}
