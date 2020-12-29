import { Dispatch } from "react";
import { ActionType, StateType } from "../../reducer";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export type Command = (
  args: string[],
  state: StateType,
  dispatch: Dispatch<ActionType>,
  text: string,
  model: monaco.editor.ITextModel
) => void;

export default Command