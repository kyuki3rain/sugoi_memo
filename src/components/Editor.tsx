import React from 'react'
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

type Props = {
  text: string;
  setText: (e: string) => void;
}

const Editor: React.FC<Props> = ({text, setText}) => {
  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="javascript"
      theme="github"
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={text}
      onChange={(e) => {setText(e);}}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  )
}

export default Editor;