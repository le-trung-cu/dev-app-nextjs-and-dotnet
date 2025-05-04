import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import { useEditorStore } from "../stores";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ImageButton = () => {
  const [openInsertUrl, setOpenInserUrl] = useState(false);
  const [editor] = useEditorStore();
  const [imageUrl, setImageUrl] = useState(editor?.getAttributes("link").href ?? "");
  const imageRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
            <ImageIcon className="size-4"/>
            <input
              ref={imageRef}
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                const url = URL.createObjectURL(file!);
                editor?.chain().focus().setImage({ src: url }).run();
              }}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => imageRef.current?.click()}>
            <UploadIcon /> Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenInserUrl(true)}>
            <SearchIcon /> Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog modal open={openInsertUrl} onOpenChange={setOpenInserUrl}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inset image URL</DialogTitle>
          </DialogHeader>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="image url"
          />
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (imageUrl) {
                  editor?.chain().focus().setImage({ src: imageUrl }).run();
                }
                setOpenInserUrl(false);
              }}
            >
              Insert
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
