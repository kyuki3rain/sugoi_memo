import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  loadText: (filename: string) => ipcRenderer.invoke("load-text", filename),
  backup: (filename: string, str: string) => ipcRenderer.invoke("backup", filename, str),
  open: () => ipcRenderer.invoke("open"),
  load: (filename: string) => ipcRenderer.invoke("load", filename),
  new: (filename: string) => ipcRenderer.invoke("new", filename),
  save: (filename: string, text: string) => ipcRenderer.invoke("save", filename, text),
});
