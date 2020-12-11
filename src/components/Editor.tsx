import React from 'react'
import MonacoEditor from 'react-monaco-editor';
import useWindowDimensions from '../helpers/useWindowDimensions';

type Props = {
  text: string;
  setText: (e: string) => void;
}

const Editor: React.FC<Props> = ({text, setText}) => {
  const { width, height } = useWindowDimensions();
  const options = {
    selectOnLineNumbers: true
  };
  return (
    <MonacoEditor
      width={width}
      height={height}
      language="html"
      theme="vs"
      options={options}
      value={text}
      onChange={(e)=>{setText(e)}}
    />
  )
}

export default Editor;