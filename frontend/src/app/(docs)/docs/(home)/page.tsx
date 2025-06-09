import { getCurrent } from "@/app-features/auth/actions";
import { DataTable } from "@/app-features/docs/features/documents/components/data-table";
import { TemplatesGallery } from "@/app-features/docs/features/documents/components/templates-gallery";
import { redirect } from "next/navigation";

export default async function DocsHomePage() {
  const current = await getCurrent();
  if (!current) redirect("/login");
  return (
    <div>
      <TemplatesGallery />
      <div className="mx-auto mt-10 max-w-screen-xl">
        <DataTable />
      </div>
    </div>
  );
}
