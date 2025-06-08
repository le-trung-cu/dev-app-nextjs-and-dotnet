"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthenticateType } from "../types";
import { useCurrentInfo } from "../api/use-current-info";

const AuthenticateContext = createContext<
  | { current?: AuthenticateType["user"] | null; isAuthLoading: boolean }
  | null
>(null);

export const AuthenticateProdvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading } = useCurrentInfo();
  const value = useMemo(
    () => ({
      current: data?.user,
      isAuthLoading: isLoading,
    }),
    [data, isLoading],
  );
  return (
    <AuthenticateContext.Provider value={value}>
      {children}
    </AuthenticateContext.Provider>
  );
};

export const Authenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useContext(AuthenticateContext);
  const isAuthenticated = !!context &&  !context.isAuthLoading && !!context.current;

  return isAuthenticated ? children : null;
};


export const Unauthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useContext(AuthenticateContext);
  const isAuthenticated = !!context && !!context.current;

  return isAuthenticated || context!.isAuthLoading ? null : children;
};


export const AuthLoading = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useContext(AuthenticateContext);
  const isAuthLoading =  !!context && context.isAuthLoading;
  return isAuthLoading ? children : null;
};
