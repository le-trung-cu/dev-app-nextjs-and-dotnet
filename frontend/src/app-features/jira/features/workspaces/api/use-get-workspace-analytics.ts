import { clients } from "@/lib/clients";
import { QueryClient, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { GetWorkspaceAnalyticsResponseType } from "../types";
import axios from "axios";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { sleep } from "@/lib/utils";

export const useGetWorkspaceAnalytics = ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const query = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const response = await clients.get<GetWorkspaceAnalyticsResponseType>(
        `/api/jira/workspaces/${workspaceId}/analytics`,
      );
      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }
      return response.data.workspaceAnalytics;
    },
  });

  return query;
};

export const useSuspenseGetWorkspaceAnalytics = ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const query = useSuspenseQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      const response = await clients.get(
        `/api/jira/workspaces/${workspaceId}/analytics`,
      );
      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }
      console.log("useGetWorkspaceAnalytics");

      return response.data.workspaceAnalytics;
    },
  });

  return query;
};

export const prefetchGetWorkspaceAnalytics = async ({
  queryClient,
  token,
  workspaceId,
}: {
  queryClient: QueryClient;
  token: string;
  workspaceId: string;
}) => {
  return queryClient.prefetchQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      const response = await axios.get(
        `/api/jira/workspaces/${workspaceId}/analytics`,
        {
          baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.data.isSuccess) {
        throw new Error("have some error");
      }
      return response.data.workspaceAnalytics;
    },
    staleTime: 1000 * 60,
  });
};
