import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  imgUrl: string;
  name: string;
  className?: string;
};
export const ProjectAvatar = ({ imgUrl, name, className }: Props) => {
  return (
    <Avatar className={cn("size-6 rounded-sm font-semibold", className)}>
      <AvatarImage src={imgUrl} />
      <AvatarFallback className="rounded-sm">
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
