import * as API from "../../helpers/myAPI";
import Command from "./type";

export const load: Command = (args, state, dispatch, text, model) => {
  const setText = (t: string) => dispatch({ type: "setText", text: t });
  // let num = 9;
  // if(args.length === 2){
  //   if(isNaN(parseInt(args[1]))) num = parseInt(args[1]);
  // }
  API.load(state.filename, setText);
}

export const backup: Command = (args, state, dispatch, text, model) => {
  API.backup(state.filename, text);
  dispatch({ type: "setText", text });
}

export const list: Command = (args, state, dispatch, text, model) => {
  const setText = (t: string) => dispatch({ type: "setText", text: t });
  API.list(text, setText);
}

export const open: Command = (args, state, dispatch, text, model) => {
  if(state.filename){
    API.backup(state.filename, text);
    API.save(state.filename, text);
  }
  const setFileName = (filename: string) => dispatch({ type: "setFileName", filename });
  const setText = (text: string) => dispatch({ type: "setText", text });
  if(args.length === 2){
    API.open(setFileName, setText, args[1]);
  }
  else if(args.length === 1){
    API.open(setFileName, setText, null);
  }
}

export const save: Command = (args, state, dispatch, text, model) => {
  API.save(state.filename, text);
  dispatch({ type: "setText", text })
}

export const exit: Command = (args, state, dispatch, text, model) => {
  API.exit();
}