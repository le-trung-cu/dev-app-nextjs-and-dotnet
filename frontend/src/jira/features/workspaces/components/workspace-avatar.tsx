import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  imgUrl: string;
  name: string;
};
export const WorkspaceAvatar = ({ imgUrl, name }: Props) => {
  return (
    <Avatar className="rounded-sm font-semibold">
      <AvatarImage src={imgUrl} />
      <AvatarFallback className="rounded-sm">{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
