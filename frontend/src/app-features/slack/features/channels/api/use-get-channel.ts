import { clients } from "@/lib/clients";
import { useQuery } from "@tanstack/react-query";
import { GetChannelResponseType } from "../types";

export const useGetChannel = ({
  workspaceId,
  channelId,
}: {
  workspaceId: string;
  channelId: string;
}) => {
  const query = useQuery({
    queryKey: ["channel", channelId],
    queryFn: async () => {
      const response = await clients.get<GetChannelResponseType>(`/api/slack/workspaces/${workspaceId}/channels/${channelId}`);
      if(response.data.isSuccess) {
        return response.data.channel;
      }

      throw new Error("has some error");
    },
  });

  return query;
};
