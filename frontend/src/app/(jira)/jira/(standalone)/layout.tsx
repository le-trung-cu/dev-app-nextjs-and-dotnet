import { LogoJira } from "@/app-features/jira/components/logo";

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="shadow">
        <div className="container mx-auto flex h-[60px] items-center">
          <div className="size-[40px]">
            <LogoJira />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl pt-20">{children}</div>
    </div>
  );
}
