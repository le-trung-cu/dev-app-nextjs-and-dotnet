import { atom, useAtom } from "jotai";

const createMediaModalAtom = atom<boolean>(false);

export const useCreateMediaModal = () =>  useAtom(createMediaModalAtom)
