import React, { useState, useContext } from 'react'
import { Content } from '../Main';
import MonacoEditor, { EditorDidMount } from 'react-monaco-editor';
import useWindowDimensions from '../helpers/useWindowDimensions';
import languages from "../consts/languages";

const Editor: React.FC = () => {
  const { state, dispatch } = useContext(Content);
  const { width, height } = useWindowDimensions();
  const options = {
    selectOnLineNumbers: true
  };

  const [language, setLanguage] = useState("html");
  
  const ditMount: EditorDidMount = (editor, monaco) => {
    editor.focus();
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const position = editor.getPosition();
      const txts = editor.getValue().split(/\n/);
      const model = editor.getModel();
      if(!position || !model) return false;

      const cmd = txts.splice(position.lineNumber-1, 1)[0].replace(/\s+/g, "");
      if(languages.includes(cmd)){
        monaco.editor.setModelLanguage(model, cmd);
        setLanguage(cmd);
        editor.setValue(txts.join("\n"));
        editor.setPosition({column: 1, lineNumber: txts.length});
      }
    });
  }
  console.log(language);

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