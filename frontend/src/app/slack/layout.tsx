import { JotaiProvioder } from "@/slack/components/jotai-provider";
import { Modals } from "@/slack/components/modals";

export default function SlackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <JotaiProvioder>
      {children}
      <Modals />
    </JotaiProvioder>
    </>
  );
}
