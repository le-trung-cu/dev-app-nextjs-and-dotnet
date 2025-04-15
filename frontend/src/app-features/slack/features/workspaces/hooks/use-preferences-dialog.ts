import { atom, useAtom } from "jotai";

const dialogState = atom(false);

export const usePreferencesDialog = () => {
  return useAtom(dialogState);
};
