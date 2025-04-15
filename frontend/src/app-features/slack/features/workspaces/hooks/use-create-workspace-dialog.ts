import { atom, useAtom } from "jotai";

const dialogState = atom(false);

export const useCreateWorkspaceDialog = () => {
  return useAtom(dialogState);
};
