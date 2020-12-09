import React, { useContext } from 'react'
import { Content } from '../Main';
import Editor from "../components/Editor"

const EditorPage: React.FC = () => {
  const { state, dispatch } = useContext(Content);
  return (
    <Editor text={state.text} setText={(text) => dispatch({type: "setText", text})}></Editor>
  )
}

export default EditorPage;