import { fileToDataURL } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const ImagePreview = () => {
  const { control } = useFormContext();
  const { file } = useWatch({
    control,
    defaultValue: {
      file: null,
    },
  });
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    (async () => {
      if (!file) {
        setDataUrl("");
        return;
      }
      const dataURL = await fileToDataURL(file);
      setDataUrl(dataURL);
    })();
  }, [file]);

  if (!dataUrl) {
    return (
      <div className="mr-5 size-[64px] bg-slate-200/30 flex justify-center items-center rounded-full overflow-hidden">
        <ImageIcon className="size-[30px]" />
      </div>
    );
  }
  return (
    <div className="mr-5 size-[64px] bg-slate-200/30 flex justify-center items-center rounded-lg overflow-hidden shadow-md shadow-black">
      <Image
        src={dataUrl}
        height={64}
        width={64}
        alt=""
        className="size-[64px]"
      />
    </div>
  );
};