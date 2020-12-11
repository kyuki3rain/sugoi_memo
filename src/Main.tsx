import React, { useEffect, useReducer, createContext } from "react";
import 'reset-css';
import EditorPage from "./pages/EditorPage";
import { ActionType, myReducer, StateType } from "./reducer";
import styled from "styled-components";

const { myAPI } = window;

const App = styled.div`
    height: 100%;
    width:  100%;
    margin: 0;
    overflow: hidden;
`

const initialState = { text: '' };
type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

export const Content = createContext({} as ContextType);

function Main() {
  const [state, dispatch] = useReducer(myReducer, initialState);

  const loadText = async () => {
    dispatch({
      type: "setText",
      text: await myAPI.loadText()
    });
  }

  useEffect(()=>{
    loadText();
  }, []);

  return (
    <Content.Provider value={{ state, dispatch }}>
      <App>
          <EditorPage></EditorPage>
      </App>
    </Content.Provider>
  );
}



export default Main;