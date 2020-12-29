export type StateType = {
  text: string;
  filename: string;
  language: string;
};

export type ActionType = {
  text?: string;
  filename?: string;
  language?: string;
  type: string;
};

export const initialState = { text: '', filename: '', language: '' };

export const myReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'setText':
      return { ...state, text: action.text || "" };
    case 'setFileName':
      return { ...state, filename: action.filename || "" };
    case 'setLanguage':
      return { ...state, language: action.language || "" };
    default:
      return state;
  }
};