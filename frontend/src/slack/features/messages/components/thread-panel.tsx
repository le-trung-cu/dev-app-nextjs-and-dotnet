"use client";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { usePanel } from "@/slack/hooks/use-panel";
import { Thread } from "./thread";



export const ThreadPanel = () => {
  const { parentMessageId: parentMesageId } = usePanel();
  if (!parentMesageId) return null;
 
  return (
    <>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={45}>
        <Thread />
      </ResizablePanel>
    </>
  );
};
