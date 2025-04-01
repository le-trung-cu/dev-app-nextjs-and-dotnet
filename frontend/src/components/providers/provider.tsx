"use client";

import { clients } from "@/lib/clients";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
import { AuthenticateType } from "@/features/auth/types";
// import { MessageRequiredConfirmEmailDialog } from "@/features/auth/components/message-required-confirm-email-dialog";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

type ProvidersProps = {
  children: React.ReactNode;
  authenticated: AuthenticateType | null;
  refreshToken?: string;
};
export function Providers({ children, authenticated }: ProvidersProps) {
  clients.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${authenticated?.token}`;

  const queryClient = getQueryClient();

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        {/* <MessageRequiredConfirmEmailDialog authenticated={authenticated} /> */}
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
