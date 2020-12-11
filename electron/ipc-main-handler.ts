import { ipcMain } from "electron";
import * as Store from "electron-store";
import * as fs from "fs";

export const initIpcMain = (store: Store<Record<string, unknown>>) => {
  ipcMain.handle("load-text", () => {return store.get("text")});
  ipcMain.handle("read-dir", async () => fs.promises.readdir("./"));
  ipcMain.handle("save", (event, str: string) => {
    store.delete('text');
    store.set("text", str);
  });
};