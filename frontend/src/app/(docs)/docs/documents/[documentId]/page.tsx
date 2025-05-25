import { redirect } from "next/navigation";
import { getCurrent } from "@/app-features/auth/actions";
import DocumentEditor from "../../../../../app-features/docs/features/documents/components/document-editor";

export default async function Page() {
  const current = await getCurrent();
  if (!current) redirect("/login");

  return <DocumentEditor />;
}
