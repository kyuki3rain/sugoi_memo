import React, { useEffect, useReducer, createContext } from "react";
import 'reset-css';
import EditorPage from "./pages/EditorPage";
import { ActionType, myReducer, StateType } from "./reducer";

const { myAPI } = window;

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
      <div className="App">
        <EditorPage></EditorPage>
      </div>
    </Content.Provider>
  );
}

export default Main;