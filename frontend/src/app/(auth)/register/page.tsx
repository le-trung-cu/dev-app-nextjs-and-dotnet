import { getCurrent } from "@/app-features/auth/actions";
import { RegisterForm } from "@/app-features/auth/components/register-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const current = await getCurrent();
  if (current) redirect("/");

  return <RegisterForm />;
}
