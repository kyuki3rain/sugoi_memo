import { ActionType } from "../reducer";

const { myAPI } = window;

export const loadText = async (dispatch: React.Dispatch<ActionType>) => {
  if(myAPI){
    const text = await myAPI.loadText();
    dispatch({ type: "setText", text });
  }
}

export const saveText = (text: string) => {
  if(myAPI){
    myAPI.save(text);
  }
}