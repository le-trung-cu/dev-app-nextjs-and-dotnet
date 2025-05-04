import { getCurrent } from "@/app-features/auth/actions";
import { JotaiProvioder } from "@/app-features/slack/components/jotai-provider";
import { Modals } from "@/app-features/slack/components/modals";
import { SignalRProvider } from "@/app-features/slack/components/signalr-provider";
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
