import { getCurrent } from "@/app-features/auth/actions";
import { LoginForm } from "@/app-features/auth/components/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const current = await getCurrent();
  if (current) redirect("/");

  return <LoginForm />;
}
