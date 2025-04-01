import { getCurrent } from "@/features/auth/actions";
import { LoginForm } from "@/features/auth/components/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const current = await getCurrent();
  if (current) redirect("/");

  return <LoginForm />;
}
