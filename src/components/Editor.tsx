import React, { useState, useContext } from 'react'
import { Content } from '../Main';
import MonacoEditor, { EditorDidMount } from 'react-monaco-editor';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import useWindowDimensions from '../helpers/useWindowDimensions';
import languages from "../consts/languages";
import { loadText, newFile, open, save } from "../helpers/myAPI";

const Editor: React.FC = () => {
  const { state, dispatch } = useContext(Content);
  const [ editor, setEditor ] = useState({} as monaco.editor.IStandaloneCodeEditor)
  const { width, height } = useWindowDimensions();
  const options = {
    selectOnLineNumbers: true
  };

  if(editor.addCommand){
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const position = editor.getPosition();
      const txts = editor.getValue().split(/\n/);
      const model = editor.getModel();
      if(!position || !model) return false;
      
      const cmd = txts.splice(position.lineNumber-1, 1)[0].replace(/^\s+/, "");
      let text = txts.join("\n");

      if(cmd.split(" ")[0] === "open"){
        const args = cmd.split(" ").filter((e)=>{return e});
        if(args.length === 2){
          dispatch({type: "setFileName", filename: args[1]});
        }
        else if(args.length === 1){
          open(dispatch);
        }
        return;
      }
      else if(cmd === "load"){
        loadText(state.filename, dispatch);
      }
      else if(cmd.split(" ")[0] === "new"){
        newFile(cmd.split(" ").filter((e)=>{return e})[1], dispatch);
        return;
      }
      else if(cmd === "save"){
        save(state.filename, text);
      }
      else if(languages.includes(cmd)){
        monaco.editor.setModelLanguage(model, cmd);
        setLanguage(cmd);
      }
      else if(cmd === "status"){
        console.log(state);
        const stateText = JSON.stringify({...state, text});
        text += stateText;
      }
      else return;

      editor.setValue(text);
      editor.setPosition({column: 1, lineNumber: txts.length});
    });
  }

  const [language, setLanguage] = useState("html");
  
  const ditMount: EditorDidMount = (editor, monaco) => {
    editor.focus();
    setEditor(editor);
  }

  return (
    <MonacoEditor
      width={width}
      height={height}
      language={language}
      theme="vs"
      options={options}
      value={state.text}
      onChange={ (text) => dispatch({type: "setText", text})}
      editorDidMount={ditMount}
    />
  )
}

export default Editor;