import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { cn } from "@/lib/utils";

type Props = {
  imgUrl: string;
  name: string;
  className?: string;
};
export const OrganizationAvatar = ({ imgUrl, name, className }: Props) => {
  return (
    <Avatar className={cn("rounded-sm font-semibold", className)}>
      <AvatarImage src={ `${NEXT_PUBLIC_API_HOST_ADDRESS}${imgUrl}`} />
      <AvatarFallback className="rounded-sm">
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
