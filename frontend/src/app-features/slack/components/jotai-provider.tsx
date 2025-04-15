import { Provider } from "jotai";

export const JotaiProvioder = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};
