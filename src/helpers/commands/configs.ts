import languages from "../../consts/languages";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import Command from "./type";

export const setLanguage: Command = (args, state, dispatch, text, model) => {
  if(args.length !== 3) return false;
  if(!languages.includes(args[2])) return false;

  const language = args[2];

  monaco.editor.setModelLanguage(model, language);
  dispatch({type: "setLanguage", language});
}

export const status: Command = (args, state, dispatch, text, model) => {
  const stateText = JSON.stringify({...state, text});
  dispatch({ type: "setText", text: text + stateText });
}