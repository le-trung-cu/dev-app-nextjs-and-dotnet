import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link2Icon, Link2OffIcon } from "lucide-react";
import { useEditorStore } from "../stores";
import { useCallback, useState } from "react";
import { useWatch } from "../toolbar-context/use-watch";

export const LinkButton = () => {
  const [editor] = useEditorStore();
  const [url, setUrl] = useState<string>("");
  const isActive = useWatch("toolbar.link");

  const setLink = useCallback(() => {
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e: unknown) {
      alert((e as Error).message);
    }
  }, [editor, url]);

  return (
    <>
    <Popover
      onOpenChange={(open) => {
        const previousUrl = editor?.getAttributes("link").href ?? "";
        setUrl(open ? previousUrl : "");
      }}
    >
      <PopoverTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <Link2Icon className="size-5"/>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[80vw] max-w-3xl">
        <div className="flex items-center gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            placeholder="https://example.com"
          />
          <Button onClick={setLink}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>

    {isActive && <button
        className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80"
        onClick={() => editor?.chain().focus().unsetLink().run()}
      >
        <Link2OffIcon className="size-5"/>
      </button>}
    </>

  );
};
