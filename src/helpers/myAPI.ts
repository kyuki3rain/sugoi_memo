const { myAPI } = window;

export const backup = (filename: string, text: string) => {
  if(myAPI && filename){
    myAPI.backup(filename, text);
  }
}

export const load = async (filename: string, setText: (text: string) => void) => {
  if(myAPI && filename){
    const text = await myAPI.load(filename);
    setText(text);
  }
}

export const list = async (text: string, setText: (text: string) => void) => {
  if(myAPI){
    const list = await myAPI.list();
    setText(text + list.join("\n"));
  }
}

export const open = async (setFileName: (filename: string) => void, setText: (text: string) => void, filename: string | null) => {
  if(myAPI){
    if(!filename){
      filename = await myAPI.openFile();
    }
    if(filename){
      await myAPI.open(filename);
      const text = await myAPI.load(filename);
      setFileName(filename);
      setText(text);
    }
  }
}

export const save = (filename: string, text: string) => {
  if(myAPI && filename){
    myAPI.backup(filename, text);
    myAPI.save(filename);
  }
}

export const exit = () => {
  if(myAPI) myAPI.exit();
}