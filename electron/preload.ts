import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  loadText: () => ipcRenderer.invoke("load-text"),
  readDir: () => ipcRenderer.invoke("read-dir"),
  save: (str: string) => ipcRenderer.invoke("save", str),
});
