import React, { useState, useContext } from 'react'
import { Content } from '../Main';
import MonacoEditor, { EditorDidMount } from 'react-monaco-editor';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import useWindowDimensions from '../helpers/useWindowDimensions';
import parser from '../helpers/parser';


const Editor: React.FC = () => {
  const { state, dispatch } = useContext(Content);
  const [ editor, setEditor ] = useState({} as monaco.editor.IStandaloneCodeEditor)
  const { width, height } = useWindowDimensions();
  const options = {
    selectOnLineNumbers: true
  };
  
  if(editor.addCommand){
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => parser(editor, state, dispatch));
  }
  const ditMount: EditorDidMount = (editor, monaco) => {
    editor.focus();
    setEditor(editor);
  }

  return (
    <MonacoEditor
      width={width}
      height={height}
      language={state.language}
      theme="vs"
      options={options}
      value={state.text}
      onChange={ (text) => dispatch({type: "setText", text})}
      editorDidMount={ditMount}
    />
  )
}

export default Editor;