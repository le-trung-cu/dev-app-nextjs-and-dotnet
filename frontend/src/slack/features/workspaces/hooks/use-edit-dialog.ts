import { atom, useAtom } from "jotai";

const dialogStatte = atom(false);

export const useEditDialog = () => {
  return useAtom(dialogStatte);
}