import { BrowserWindow, dialog, ipcMain } from "electron";
import * as Store from "electron-store";
import * as fs from "fs";
import * as path from "path";

export const initIpcMain = (store: Store<Record<string, unknown>>, win: BrowserWindow) => {
  ipcMain.handle("load-text", (event, filename: string) => {return store.get(`${filename}-text`)});
  ipcMain.handle("backup", (event, filename: string, str: string) => {
    const t = `${filename}-text`;
    if(store.get(t)) store.delete(t);
    store.set(t, str);
  });
  ipcMain.handle("open", async () => {
    let filenames = await dialog.showOpenDialog(win, {
      properties: ['openFile'],
      title: 'Select a text file',
      defaultPath: process.resourcesPath,
      filters: [
          {name: 'text file', extensions: ['txt']}
      ]
    });
    if(filenames.canceled) return false;
    
    const filePath = filenames.filePaths[0];
    const filename = filePath.split("/").slice(-1)[0].split(".")[0];
    const t = `${filename}-text`;
    fs.readFile(filePath, "utf8", (err, data) => {
      if(store.get(t)) store.delete(t);
      store.set(t, data);
    });
    return filename;
  });
  ipcMain.handle("load", async (event, filename) => {
    const t = `${filename}-text`;
    fs.readFile(path.join(process.resourcesPath, `${filename}.txt`), "utf8", (err, data) => {
      if(store.get(t)) store.delete(t);
      store.set(t, data);
    });
    return filename;
  })
  ipcMain.handle("new", (event, filename) => {
    if(store.get(`${filename}-text`)) return;
    fs.writeFile(path.join(process.resourcesPath, `${filename}.txt`), "", (err) => {
    });
  });
  ipcMain.handle("save", (event, filename, text) => {
    fs.writeFile(path.join(process.resourcesPath, `${filename}.txt`), text, (err) => {});
  });
};