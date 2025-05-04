import { Extension } from "@tiptap/core";

export interface LineHeightOptions {
  types: string[];
  heights: string[];
  defaultLineHeight: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set the line height attribute
       */
      setLineHeight: (height: string) => ReturnType;
      /**
       * Unset the text align attribute
       */
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeight = Extension.create<LineHeightOptions>({
  name: "lineHeight",

  addOptions() {
    return {
      types: ["heading", "paragraph"],
      heights: ["normal", "1", "1.15", "1.5", "2"],
      defaultLineHeight: "normal",
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: (element) =>
              element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML: (attributes) => {
              if (attributes.lineHeight === this.options.defaultLineHeight) {
                return {};
              }

              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (height: string) =>
        ({ commands }) => {
          if (!this.options.heights.includes(height)) {
            return false;
          }

          return this.options.types.every((type) =>
            commands.updateAttributes(type, { lineHeight: height })
          );
        },

      unsetLineHeight:
        () =>
        ({ commands }) => {
          return this.options.types.every((type) =>
            commands.resetAttributes(type, "lineHeight")
          );
        },
    };
  },
});