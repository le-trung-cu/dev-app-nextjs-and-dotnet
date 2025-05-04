import { atom, useAtom } from "jotai";
import {Editor} from "@tiptap/react";

export const editorAtom = atom<Editor|null>(null);

export const useEditorStore = () =>  useAtom(editorAtom)
