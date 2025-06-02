import { clients } from "@/lib/clients";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { GetWorkspacesResponseType } from "../types";
import axios from "axios";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await clients.get<GetWorkspacesResponseType>(
        "/api/jira/workspaces",
      );
      if (!response.data.isSuccess) {
        throw new Error("have some error");
      }
      return response.data.workspaces;
    },
    throwOnError: true,
  });

  return query;
};

export const prefetchWorkspaces = async ({
  queryClient,
  token,
}: {
  queryClient: QueryClient;
  token: string;
}) => {
  return queryClient.prefetchQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await axios.get("/api/jira/workspaces", {
        baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.isSuccess) {
        throw new Error("have some error");
      }
      return response.data.workspaces;
    },
    staleTime: 1000 * 60,
  });
};
