"use client";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { usePanel } from "@/app-features/slack/hooks/use-panel";
import { Thread } from "./thread";
import { Profile } from "../../members/components/profile";



export const ThreadPanel = () => {
  const { parentMessageId, profileMemberId, onClose } = usePanel();
  if (!parentMessageId && !profileMemberId) return null;
 
  return (
    <>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={45}>
        {parentMessageId && <Thread parentMessageId={parentMessageId} onClose={onClose}/>}
        {profileMemberId && <Profile userId={profileMemberId} onClose={onClose}/>}
      </ResizablePanel>
    </>
  );
};
