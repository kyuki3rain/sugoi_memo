export const message = {
  Android: 'Android'
} as const;
export type Message = keyof typeof message; // 'iOS' | 'Android'
const isMessage = (type: any): type is Message => {
  return type in message;
}

export const null_message = {
  filename: 'ファイル名',
  text: "本文",
} as const;
export type NullMessage = keyof typeof null_message; // 'iOS' | 'Android'
const isNullMessage = (type: any): type is NullMessage => {
  return type in message;
}

export const error = (type: Message | NullMessage) => {
  if(isMessage(type)){
    return message[type];
  }
  else if(isNullMessage(type)){
    return null_message[type] + "が取得できませんでした。";
  }
}