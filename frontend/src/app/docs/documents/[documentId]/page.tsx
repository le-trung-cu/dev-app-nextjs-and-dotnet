"use client";
import { DocEditor } from "@/app-features/docs/features/editor/components/editor";
import { useEditorStore } from "@/app-features/docs/features/editor/stores";
import { Navbar } from "@/app-features/docs/features/document-id/components/navbar";
import { Toolbar } from "@/app-features/docs/features/editor/components/toolbar";
import { ToolbarProvider } from "@/app-features/docs/features/editor/toolbar-context/toolbar-context";
import { useSyncEditorToolbar } from "@/app-features/docs/features/editor/toolbar-context/use-sync-editor-toolbar";

export default function DocumentIdPage() {
  const [, setEditor] = useEditorStore();

  return (
    <ToolbarProvider>
      <SyncEditorToolbar />
      <div className="min-h-screen pt-[128px] print:pt-0">
        <div className="bg-background fixed top-0 right-0 left-0 z-40 print:hidden">
          <div className="px-5">
            <Navbar />
            <Toolbar />
          </div>
        </div>
        <DocEditor setEditor={setEditor} />
      </div>
    </ToolbarProvider>
  );
}

const SyncEditorToolbar = () => {
  const [editor] = useEditorStore();

  useSyncEditorToolbar(editor);

  return null;
};
