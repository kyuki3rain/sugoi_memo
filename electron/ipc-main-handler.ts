import { BrowserWindow, dialog, ipcMain } from "electron";
import * as Store from "electron-store";
import * as fs from "fs";
import * as path from "path";

type StoreType = {
  filenames: string[],
  texts: { [key:string] : string },
  logs: { [key:string] : string[] },
}

const initialStore = {
  filenames: [],
  texts: {},
  logs: {}
}

export const initIpcMain = (win: BrowserWindow) => {
  const store = new Store<StoreType>();
  for (const [key, value] of Object.entries(initialStore)) {
    if(!store.get(key)) store.set(key, value);
  }
  const backup = (filename: string, text: string) => {
    const texts = store.get('texts');
    if(texts) store.delete('texts');
    store.set('texts', { ...texts, [filename]: text });
  }
  const backup_logs = (filename: string, text: string) => {
    let logs = store.get('logs');
    if(!logs) logs = {};
    let log = logs[filename];
    if(!log) log = new Array(10).fill("");
  
    log.pop();
    log.push(text);
  
    const new_logs = { ...logs, [filename]: log }
    if(logs) store.delete('logs');
    store.set('logs', new_logs);
  }
  
  ipcMain.handle("exit", (event) => {win.close()});
  
  ipcMain.handle("load", async (event, filename: string) => {return store.get(`texts`)[filename]});
  ipcMain.handle("loadLog", async (event, filename: string, num: number = 9) => {return store.get(`logs`)[filename][num]});
  
  ipcMain.handle("list", async (event) => {
    const texts = store.get(`texts`);
    if(!texts) return [];
    return Object.keys(texts);
  });
  
  ipcMain.handle("loadLogs", async (event, filename: string) => {return store.get(`logs`)[filename]});
  
  ipcMain.handle("backup", (event, filename: string, text: string) => {
    backup(filename, text);
    backup_logs(filename, text);
  });

  ipcMain.handle("openFile", async (event) => {
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
    const filename = filePath.split(process.resourcesPath + "/")[1].split(".txt")[0];

    return filename;
  })

  ipcMain.handle("open", async (event, filename) => {
    const filePath = path.join(process.resourcesPath, `/${filename}.txt`);
    fs.readFile(filePath, (error, data) => {
      if (error != null) {
          return "";
      }

      const text = data.toString();
      const texts = store.get('texts');
      if(texts) store.delete('texts');
      store.set('texts', {...texts, [filename]: text});
      return filename;
    });
  });

  ipcMain.handle("save", (event, filename) => {
    const text = store.get(`texts`)[filename];
    const filePath = path.join(process.resourcesPath, `/${filename}.txt`);
    fs.writeFile(filePath, text, (err) => {});
  });
};
