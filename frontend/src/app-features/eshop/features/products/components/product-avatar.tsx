import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { cn } from "@/lib/utils";

type Props = {
  imgUrl?: string;
  name: string;
  className?: string;
};
export const ProductAvatar = ({ imgUrl, name , className}: Props) => {
  // return <div>${NEXT_PUBLIC_API_HOST_ADDRESS}${imgUrl}</div>
  return (
    <Avatar className={cn("rounded-sm font-semibold bg-red-500", className)}>
      <AvatarImage className="object-cover" src={`${NEXT_PUBLIC_API_HOST_ADDRESS}${imgUrl}`} />
      <AvatarFallback className="rounded-sm">{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
