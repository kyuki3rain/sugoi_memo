import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { ActionType, StateType } from "../reducer";
import * as commands from "./commands";

export const assign = (args: string[]) => {
  const cmd = args[0];
  switch(cmd){
    case "backup": return commands.backup;
    case "exit": return commands.exit;
    case "load": return commands.load;
    case "list": return commands.list;
    case "open": return commands.open;
    case "save": return commands.save;
    case "status": return commands.status;
    case "set": return set(args.slice(1));
    default: return false;
  }
}

const set = (args: string[]) => {
  const cmd = args[0];
  switch(cmd){
    case "language": return commands.setLanguage;
    default: return false;
  }
}

type Parser = (
  editor: monaco.editor.IStandaloneCodeEditor,
  state: StateType,
  dispatch: React.Dispatch<ActionType>
  ) => void;

const parser: Parser = (editor, state, dispatch) => {
  const position = editor.getPosition();
  let uLine = editor.getValue().split(/\n/);
  const model = editor.getModel();
  if(!position || !model) return false;

  const line = uLine.splice(position.lineNumber-1, 1, "")[0].replace(/^\s+/, "");
  const args = line.split(" ").filter((e)=>{return e});
  const text = uLine.join("\n");
  
  const func = assign(args);
  if(!func){ 
    dispatch({ type: "setText", text: text + "code error!" });
    return false;
  }
  
  func(args, state, dispatch, text, model);
}

export default parser
