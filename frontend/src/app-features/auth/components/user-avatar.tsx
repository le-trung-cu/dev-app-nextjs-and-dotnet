"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useCurrentInfo } from "../api/use-current-info";
import { Loader } from "lucide-react";

export const UserAvatar = ({
  className,
  isLoading,
  name,
}: {
  className?: string;
  isLoading?: boolean;
  name: string;
}) => {
  return (
    <Avatar className={cn("rounded-sm font-semibold", className)}>
      {/* <AvatarImage src={imgUrl} /> */}
      <AvatarFallback className="rounded-sm">
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          name.charAt(0).toUpperCase()
        )}
      </AvatarFallback>
    </Avatar>
  );
};
