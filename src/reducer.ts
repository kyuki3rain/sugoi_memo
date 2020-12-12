export type StateType = {
  text: string;
  filename: string;
};

export type ActionType = {
  text?: string;
  filename?: string;
  type: string;
};

export const myReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'setText':
      return { ...state, text: action.text || "" };
    case 'setFileName':
      return { ...state, filename: action.filename || "" };
    default:
      return state;
  }
};