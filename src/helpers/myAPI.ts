import { ActionType } from "../reducer";

const { myAPI } = window;

export const loadText = async (filename: string, dispatch: React.Dispatch<ActionType>) => {
  if(myAPI && filename){
    const text = await myAPI.loadText(filename);
    dispatch({ type: "setText", text });
  }
}

export const backup = (filename: string, text: string) => {
  if(myAPI && filename && text){
    myAPI.backup(filename, text);
  }
}

export const open = async (dispatch: React.Dispatch<ActionType>) => {
  if(myAPI){
    const filename = await myAPI.open();
    if(filename){
      dispatch({ type: "setFileName", filename });
    }
  }
}
export const load = async (filename: string, dispatch: React.Dispatch<ActionType>) => {
  if(myAPI && filename){
    const text = await myAPI.loadText(filename);
    dispatch({ type: "setText", text });
  }
}
export const newFile = (filename: string, dispatch: React.Dispatch<ActionType>) => {
  if(myAPI){
    myAPI.new(filename);
    dispatch({ type: "setFileName", filename });
  }
}
export const save = (filename: string, text: string) => {
  if(myAPI){
    myAPI.save(filename, text);
  }
}