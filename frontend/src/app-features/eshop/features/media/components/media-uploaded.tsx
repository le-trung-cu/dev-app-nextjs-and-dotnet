import { ReponsiveDialog } from "@/app-features/eshop/components/reponsive-dialog";
import { useTenantId } from "../../tenants/hooks/use-tenant-id";
import { useGetMedias } from "../api/use-get-medias";
import Image from "next/image";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { Media } from "../types";

interface Props {
  onSelect: (media: Media) => void;
}
export const MediaUploaded = ({ onSelect }: Props) => {
  const tenantId = useTenantId();
  const { data } = useGetMedias({ tenantId });
  return (
    <div className="bg-background h-[90vh] p-5">
      <div className="grid grid-cols-7 flex-wrap gap-5">
        {data?.map((item) => {
          return (
            <div className="relative aspect-square" key={item.id} onDoubleClick={() => onSelect(item)}>
              <Image
                src={`${NEXT_PUBLIC_API_HOST_ADDRESS}${item.path}`}
                fill
                alt={item.alt}
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
