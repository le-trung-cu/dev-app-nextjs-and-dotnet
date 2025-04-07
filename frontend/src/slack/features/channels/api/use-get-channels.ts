import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { GetChannelsResponseType } from "../types";

export const useGetChannels = ({ workspaceId }: { workspaceId: string }) => {
  const query = useQuery({
    enabled: !!workspaceId,
    queryKey: ["channels", workspaceId],
    queryFn: async () => {
      const resposne = await clients.get<GetChannelsResponseType>(
        `/api/slack/workspaces/${workspaceId}/channels`,
      );
      if (!resposne.data.isSuccess) {
        throw new Error("has some error");
      }
      return resposne.data.channels;
    },
  });

  return query;
};
