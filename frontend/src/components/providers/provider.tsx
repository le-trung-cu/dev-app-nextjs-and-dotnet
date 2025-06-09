"use client";

import { clients } from "@/lib/clients";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import {
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
import { AuthenticateType } from "@/app-features/auth/types";
import { AuthenticateProdvider } from "@/app-features/auth/components/authenticate-provider";
// import { MessageRequiredConfirmEmailDialog } from "@/features/auth/components/message-required-confirm-email-dialog";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        shouldRedactErrors: (error) => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false;
        },
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
  if (!!authenticated?.token) {
    clients.defaults.headers.common["Authorization"] =
      `Bearer ${authenticated?.token}`;
  } else {
    clients.defaults.headers.common["Authorization"] = undefined;
  }

  const queryClient = getQueryClient();

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <AuthenticateProdvider>
          {/* <MessageRequiredConfirmEmailDialog authenticated={authenticated} /> */}
          {children}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </AuthenticateProdvider>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
