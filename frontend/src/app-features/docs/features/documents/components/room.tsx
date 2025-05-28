"use client";

import { ReactNode, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useDocumentId } from "../hooks/use-document-id";
import { useCurrentInfo } from "@/app-features/auth/api/use-current-info";
import { useGetMembers } from "../../organizations/api/use-get-members";
import { useGetDocumentsByIds } from "../api/use-get-documents-by-ids";
import { clients } from "@/lib/clients";

export function Room({ children }: { children: ReactNode }) {
  const documentId = useDocumentId();
  const { data } = useCurrentInfo();
  const organizationId = data?.appClaims.app_docs_organization;
  const { data: members } = useGetMembers({ organizationId });
  const [documentIds, setDocumentIds] = useState<string[]>([]);
  return (
    <LiveblocksProvider
      throttle={16}
      // authEndpoint="/api/liveblocks-auth"
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = documentId;
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });
        return await response.json();
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => members?.find((x) => x.userId === userId) ?? undefined,
        );
      }}
      // resolveMentionSuggestions={({ text }) => {
      //   let filteredUsers = members ?? [];
      //   if (text && members) {
      //     filteredUsers = members.filter((user) =>
      //       user.name.toLocaleLowerCase().includes(text.toLowerCase()),
      //     );
      //   }
      //   return filteredUsers.map((user) => user.userId);
      // }}
      // resolveRoomsInfo={async ({ roomIds }) => {
      //   const response = await clients.put<{
      //     isSuccess: boolean;
      //     documents: Record<string, string>;
      //   }>(`/api/docs/documents/documents-ids`, {
      //     documentIds: roomIds,
      //   });
      //   if (response.data.isSuccess) {
      //     return roomIds.map((id) => ({
      //       id,
      //       name: response.data.documents[id],
      //     }));
      //   }

      //   return [];
      // }}
    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<div>Room Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
