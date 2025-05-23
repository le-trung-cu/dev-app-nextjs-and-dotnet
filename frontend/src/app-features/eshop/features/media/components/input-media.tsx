import { ReponsiveDialog } from "@/app-features/eshop/components/reponsive-dialog";
import { Button } from "@/components/ui/button";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { Edit, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CreateMedia } from "./create-media";
import { Tenant } from "../../tenants/types";
import { Media } from "../types";
import { TenantAvatar } from "../../tenants/components/tenant-avatar";
import { MediaUploaded } from "./media-uploaded";

interface Props {
  tenantId: string;
  media?: Media | null;
  onMediaChange: (media?: Props["media"]) => void;
}

export const InputMedia = ({tenantId, media, onMediaChange }: Props) => {
  const [openCreateMedia, setOpenCreateMedia] = useState(false);
  const [editing, setEditing] = useState(false);

  const [openSelectImage, setOpenSelectImage] = useState(false);

  function onOpenChangeCreateModal(open: boolean) {
    setOpenCreateMedia(open);
  }

  return (
    <>
      {(!media || editing) && (
        <div className="flex justify-between">
          <div className="space-x-5">
            <Button
              onClick={() => setOpenCreateMedia(true)}
              type="button"
              size="sm"
              variant="outline"
              className=""
            >
              Create New
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className=""
              onClick={() => setOpenSelectImage(true)}
            >
              Select
            </Button>
          </div>
          {editing && (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setEditing(false)}
            >
              <XIcon />
            </Button>
          )}
        </div>
      )}
      {!!media && !editing && (
        <div className="flex gap-5">
          <div className="relative size-[100px] shrink-0">
            <Image
              src={`${NEXT_PUBLIC_API_HOST_ADDRESS}/${media.path}`}
              fill
              alt={media.alt}
              className="object-cover"
            />
          </div>
          <div>{media.name}</div>
          <Button
            type="button"
            size="icon"
            className="ml-auto"
            onClick={() => setEditing(true)}
          >
            <Edit />
          </Button>
        </div>
      )}
      <ReponsiveDialog
        open={openCreateMedia}
        onOpenChange={onOpenChangeCreateModal}
      >
        <CreateMedia
          tenantId={tenantId}
          onCreated={(media) => {
            onMediaChange(media);
            setOpenCreateMedia(false);
            setEditing(false);
          }}
        />
      </ReponsiveDialog>
      <ReponsiveDialog open={openSelectImage} onOpenChange={setOpenSelectImage}>
        <MediaUploaded
          onSelect={(media) => {
            onMediaChange(media);
            setOpenSelectImage(false);
            setEditing(false);
          }}
        />
      </ReponsiveDialog>
    </>
  );
};
