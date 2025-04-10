import { JotaiProvioder } from "@/slack/components/jotai-provider";
import { Modals } from "@/slack/components/modals";

export default function SlackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="slack">
        <JotaiProvioder>
          {children}
          <Modals />
        </JotaiProvioder>
      </div>
    </>
  );
}
