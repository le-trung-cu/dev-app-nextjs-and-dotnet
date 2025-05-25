import { getCurrent } from "@/app-features/auth/actions";
import { DataTableWrap } from "@/app-features/docs/features/documents/components/data-table-wrap";
import { TemplatesGallery } from "@/app-features/docs/features/documents/components/templates-gallery";
import { redirect } from "next/navigation";

export default async function DocsHomePage() {
  const current = await getCurrent();
  if(!current) redirect("/login");
  return (
    <div>
      <TemplatesGallery />
      <DataTableWrap/>
    </div>
  );
}
