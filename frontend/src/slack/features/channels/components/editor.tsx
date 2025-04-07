import Quill, { Delta, Op, QuillOptions } from "quill";
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PiTextAa } from "react-icons/pi";
import "quill/dist/quill.snow.css";
import "./editor.css";
import { ImageIcon, SendHorizonal, Smile, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmojiPopover } from "@/slack/components/emoji-popover";
import Image from "next/image";

export type EditorValue = {
  image: File | null;
  body: string;
};

type EditorProps = {
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: RefObject<Quill | null>;
  variant?: "create" | "update";
};

export default function Editor({
  onSubmit,
  // onCancel,
  placeholder = "Write something...",
  defaultValue = [],
  disabled = false,
  innerRef,
  variant = "create",
}: EditorProps) {
  const [toolbarVisible, setToolbarVisible] = useState(true);

  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContaner = container.appendChild(
      container.ownerDocument.createElement("div"),
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                const text = quill.getText();
                const addedImage = fileRef.current?.files?.[0] || null;
                const isEmpty =
                  !addedImage &&
                  text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
                if (isEmpty) return;

                const body = JSON.stringify(quill.getContents());

                submitRef.current?.({ body, image: addedImage });

                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContaner, options);
    quillRef.current = quill;
    quillRef.current.focus();
    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });
    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const toggleToolbarVisible = () => {
    setToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");
    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  };

  const onEmojiSelect = (emoji: { native: string }) => {
    const quill = quillRef.current;
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  const isEmpty = !image && text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  return (
    <div className="flex flex-col">
      <input
        ref={fileRef}
        hidden
        type="file"
        onChange={(e) => setImage(e.target.files![0])}
      />
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition focus-within:border-slate-300 focus-within:shadow-sm",
          disabled && "opacity-50",
        )}
      >
        <div ref={containerRef} className="ql-custom h-full"></div>
        {!!image && (
          <div className="group/image relative size-[64px]">
            <Button
              className="absolute -top-3 -right-3 z-10 hidden size-6 shrink-0 rounded-full group-hover/image:flex"
              onClick={() => setImage(null)}
            >
              <XIcon />
            </Button>
            <Image src={URL.createObjectURL(image)} fill alt="" />
          </div>
        )}
        <div className="z-[5] flex items-center px-2 pb-2">
          <Button
            variant="ghost"
            className={cn("size-[30px]", toolbarVisible && "bg-slate-200")}
            onClick={toggleToolbarVisible}
          >
            <PiTextAa className="size-4" />
          </Button>
          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button variant="ghost" className="size-[30px]">
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>
          {variant === "create" && (
            <Button
              variant="ghost"
              className="size-[30px]"
              onClick={() => fileRef.current?.click()}
            >
              <ImageIcon className="size-4" />
            </Button>
          )}
          {variant === "create" && (
            <Button
              className="ml-auto"
              disabled={disabled || isEmpty}
              onClick={() => {
                onSubmit({
                  body:  JSON.stringify(quillRef.current?.getContents()),
                  image,
                });
              }}
            >
              <SendHorizonal className="size-4" />
            </Button>
          )}
          {variant === "update" && (
            <>
              <Button variant="outline" className="mr-2 ml-auto">
                Cancel
              </Button>
              <Button disabled={disabled || isEmpty}>Save</Button>
            </>
          )}
        </div>
      </div>
      <div className="text-muted-foreground flex justify-end p-2 text-xs">
        <p>
          <span className="font-semibold">Shift + Return</span> to a new line
        </p>
      </div>
    </div>
  );
}
