import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  backup: (filename: string, text: string) => ipcRenderer.invoke("backup", filename, text),
  exit: () => ipcRenderer.invoke("exit"),
  load: (filename: string, num: number) => ipcRenderer.invoke("load", filename),
  loadLog: (filename: string, num: number) => ipcRenderer.invoke("loadLog", filename, num),
  list: () => ipcRenderer.invoke("list"),
  openFile: () => ipcRenderer.invoke("openFile"),
  open: (filename: string) => ipcRenderer.invoke("open", filename),
  save: (filename: string) => ipcRenderer.invoke("save", filename),
});
