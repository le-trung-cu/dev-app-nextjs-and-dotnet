export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-20 max-w-xl mx-auto">{children}</div>;
}
