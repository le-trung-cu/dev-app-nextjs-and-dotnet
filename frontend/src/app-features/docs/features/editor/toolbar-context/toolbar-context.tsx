"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";

type ToolbarValues = Record<
  string,
  boolean | string | number | null | undefined
>;

type ToolbarContextType = {
  values: ToolbarValues;
  setValue: (
    name: string,
    value: boolean | string | number | null | undefined,
  ) => void;
  registerWatcher: (name: string, callback: () => void) => () => void;
};

const ToolbarContext = createContext<ToolbarContextType | null>(null);

export const useToolbarContext = () => {
  const ctx = useContext(ToolbarContext);
  if (!ctx)
    throw new Error("useToolbarContext must be used inside ToolbarProvider");
  return ctx;
};

export const ToolbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const valuesRef = useRef<ToolbarValues>({});

  const watchers = useRef<Record<string, Set<() => void>>>({});

  const setValue = useCallback(
    (name: string, value: boolean | string | number | null | undefined) => {
      if (valuesRef.current[name] === value) return;
      valuesRef.current[name] = value;
      watchers.current[name]?.forEach((cb) => cb());
    },
    [],
  );

  const registerWatcher = useCallback((name: string, callback: () => void) => {
    if (!watchers.current[name]) watchers.current[name] = new Set();
    watchers.current[name].add(callback);

    return () => watchers.current[name].delete(callback);
  }, []);

  return (
    <ToolbarContext.Provider
      value={{ values: valuesRef.current, setValue, registerWatcher }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};
