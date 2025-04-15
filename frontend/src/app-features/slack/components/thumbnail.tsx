/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";

export const Thumbnail = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="max-w-[360px]">
          <img
            src={`${NEXT_PUBLIC_API_HOST_ADDRESS}${imgUrl}`}
            alt=""
            className="size-full overflow-hidden rounded-xl object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] sm:max-w-3xl overflow-hidden rounded-md border-0 p-0 shadow">
        <DialogTitle className="hidden"></DialogTitle>
        <img
          src={`${NEXT_PUBLIC_API_HOST_ADDRESS}${imgUrl}`}
          alt=""
          className="object-cover size-full"
        />
      </DialogContent>
    </Dialog>
  );
};
