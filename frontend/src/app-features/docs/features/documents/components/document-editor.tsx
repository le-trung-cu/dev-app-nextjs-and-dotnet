"use client";
import { DocEditor } from "@/app-features/docs/features/editor/components/editor";
import { useEditorStore } from "@/app-features/docs/features/editor/stores";
import { Navbar, NavBarSkeleton } from "@/app-features/docs/features/documents/components/navbar";
import { Toolbar } from "@/app-features/docs/features/editor/components/toolbar";
import { ToolbarProvider } from "@/app-features/docs/features/editor/toolbar-context/toolbar-context";
import { useSyncEditorToolbar } from "@/app-features/docs/features/editor/toolbar-context/use-sync-editor-toolbar";
import { useDocumentId } from "@/app-features/docs/features/documents/hooks/use-document-id";
import { Loader } from "lucide-react";
import { useGetDocumentbyId } from "@/app-features/docs/features/documents/api/use-get-document-by-id";

export default function DocumentEditor() {
  const documentId = useDocumentId();
  const [, setEditor] = useEditorStore();
  const { data, isLoading } = useGetDocumentbyId({ documentId });
  return (
    <ToolbarProvider>
      <SyncEditorToolbar />
      <div className="min-h-screen pt-[128px] print:pt-0">
        <div className="bg-background fixed top-0 right-0 left-0 z-40 print:hidden">
          <div className="px-5">
            {!!data ? <Navbar data={data} /> : <NavBarSkeleton/>}
            <Toolbar />
          </div>
        </div>
        {isLoading && <div className="flex justify-center items-center h-[200px]"><Loader className="animate-spin" /></div>}
        {!isLoading && (
          <DocEditor
            setEditor={setEditor}
            content={data?.initialContent ?? null}
          />
        )}
      </div>
    </ToolbarProvider>
  );
}

const SyncEditorToolbar = () => {
  const [editor] = useEditorStore();

  useSyncEditorToolbar(editor);

  return null;
};
