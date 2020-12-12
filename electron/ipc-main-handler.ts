import { BrowserWindow, dialog, ipcMain } from "electron";
import * as Store from "electron-store";
import * as fs from "fs";

export const initIpcMain = (store: Store<Record<string, unknown>>, win: BrowserWindow) => {
  ipcMain.handle("load-text", () => {return store.get("text")});
  ipcMain.handle("save-text", (event, str: string) => {
    store.delete('text');
    store.set("text", str);
  });
  ipcMain.handle("open", async () => {
    let filenames = await dialog.showOpenDialog(win, {
      properties: ['openFile'],
      title: 'Select a text file',
      defaultPath: '.',
      filters: [
          {name: 'text file', extensions: ['txt']}
      ]
    });
    if(!filenames.canceled){
      const filePath = filenames.filePaths[0];
      store.set('currentFile', filePath);
      fs.readFile(filePath, "utf8", (err, data) => {
        store.delete('text');
        store.set("text", data);
      });
    }
  })
};