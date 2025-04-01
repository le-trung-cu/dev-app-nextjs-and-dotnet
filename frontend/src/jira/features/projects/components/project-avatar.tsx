import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  imgUrl: string;
  name: string;
};
export const ProjectAvatar = ({ imgUrl, name }: Props) => {
  return (
    <Avatar className="size-6 rounded-sm font-semibold">
      <AvatarImage src={imgUrl} />
      <AvatarFallback className="rounded-sm">
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
