import { atom, useAtom } from "jotai";

const dialogStatte = atom(false);

export const useInviteDialog = () => {
  return useAtom(dialogStatte);
}