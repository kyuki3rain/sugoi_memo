import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  loadText: () => ipcRenderer.invoke("load-text"),
  saveText: (str: string) => ipcRenderer.invoke("save-text", str),
});
