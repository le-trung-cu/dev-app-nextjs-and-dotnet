"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/app-features/auth/components/user-avatar";

const AVATAR_SIZE = 36;

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length === 0) return null;

  return (
    <>
      <div className="flex items-center space-x-0.5">
        {currentUser && (
          <div className="relative ml-2">
            <UserAvatar className="rounded-full border" name="You"/>
          </div>
        )}
        <div className="flex">
          {users.map(({ connectionId, info }) => {
            return (
              <UserAvatar className="rounded-full border" key={connectionId} name={info.name}/>
            )
          })}
        </div>
      </div>
      <Separator orientation="vertical" className="data-[orientation=vertical]:h-6" />
    </>
  )
}

interface AvatarProps {
  src: string;
  name: string;
};

