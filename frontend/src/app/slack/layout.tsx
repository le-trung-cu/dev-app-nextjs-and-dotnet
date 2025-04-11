import { getCurrent } from "@/features/auth/actions";
import { JotaiProvioder } from "@/slack/components/jotai-provider";
import { Modals } from "@/slack/components/modals";
import { SignalRProvider } from "@/slack/components/signalr-provider";
export default async function SlackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const current = await getCurrent();

  return (
    <>
      <div className="slack">
        <JotaiProvioder>
          <SignalRProvider token={current?.token}>
            {children}
            <Modals />
          </SignalRProvider>
        </JotaiProvioder>
      </div>
    </>
  );
}
