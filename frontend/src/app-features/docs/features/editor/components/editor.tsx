"use client";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import { FontSize } from "../extensions/font-size";
import { LineHeight } from "../extensions/line-height";
import { memo, useState } from "react";
import { Ruler } from "./ruler";

type EditorProps = {
  content: string | null;
  setEditor: (editor: Editor | null) => void;
};

export const DocEditor_ = ({content, setEditor }: EditorProps) => {
  const [padding, setPadding] = useState({ paddingLeft: 56, paddingRight: 56 });

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${padding.paddingLeft}px; padding-right: ${padding.paddingRight}px`,
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit.configure({
        blockquote: {},
      }),
      LineHeight.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
      FontSize,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      FontFamily,
      ImageResize.configure({
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme,
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content, 
  });

  return (
    <div className="size-full min-h-screen overflow-x-auto bg-[#F9FBFd] px-4 pt-5 print:overflow-visible print:bg-white print:p-0">
      <div className="fixed top-[104px] left-0 right-0 z-50 bg-background">
        <Ruler
          paddingLeft={padding.paddingLeft}
          paddingRight={padding.paddingRight}
          onChange={setPadding}
        />
      </div>
      <div className="mx-auto flex w-[816px] min-w-max justify-center px-4 print:w-full print:min-w-0 print:py-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export const DocEditor = memo(DocEditor_);


// const content = `
//       <h1>This is a 1st level heading</h1>
//       <h2>This is a 2nd level heading</h2>
//       <h3>This is a 3rd level heading</h3>
//       <p>Hello World! 🌎️</p>
//       <p>Hello World! 🌎️</p>
//       <p>Hello World! 🌎️</p>
//       <p>Hello World! 🌎️</p>
//       <p>Hello World! 🌎️</p>
//       <table>
//         <tbody>
//           <tr>
//             <th>Name</th>
//             <th colspan="3">Description</th>
//           </tr>
//           <tr>
//             <td>Cyndi Lauper</td>
//             <td>Singer</td>
//             <td>Songwriter</td>
//             <td>Actress</td>
//           </tr>
//         </tbody>
//       </table>
//       <p>This is a basic example of implementing images. Drag to re-order.</p>
//       <p>
//         Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.
//       </p>
//       <p style="text-align: center">first paragraph</p>
//       <p style="text-align: right">second paragraph</p>
//       <img src="https://placehold.co/800x400" />
//       <img src="https://placehold.co/800x400/6A00F5/white" />
//     `,