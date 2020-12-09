export type StateType = {
  text: string;
};

export type ActionType = StateType & {
  type: string;
};

export const myReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'setText':
      return { ...state, text: action.text };
    default:
      return state;
  }
};