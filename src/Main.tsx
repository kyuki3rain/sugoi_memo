import React, { useEffect, useReducer, createContext } from "react";
import 'reset-css';
import EditorPage from "./pages/EditorPage";
import { ActionType, myReducer, StateType } from "./reducer";
import styled from "styled-components";
import { useInterval } from 'use-interval';
import { backup, load } from "./helpers/myAPI";

const App = styled.div`
    height: 100%;
    width:  100%;
    margin: 0;
    overflow: hidden;
`

const initialState = { text: '', filename: '' };
type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

export const Content = createContext({} as ContextType);

function Main() {
  const [state, dispatch] = useReducer(myReducer, initialState);


  useInterval(() => {
    backup(state.filename, state.text);
  }, 5000);

  useEffect(()=>{
    load(state.filename, dispatch);
  }, [state.filename]);

  return (
    <Content.Provider value={{ state, dispatch }}>
      <App>
          <EditorPage></EditorPage>
      </App>
    </Content.Provider>
  );
}

export default Main;
