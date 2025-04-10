import { atom, useAtom } from "jotai";

const dialogState = atom(false);

export const useCreateChannelDialog = () => {
  return useAtom(dialogState);
};
