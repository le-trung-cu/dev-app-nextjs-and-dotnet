import { useGetWorkspaces } from "./use-get-workspaces";

export const useGetWorkspaceById = ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const result = useGetWorkspaces();
  const workspace = result.data?.find((x) => x.id === workspaceId);
  return { ...result, data: workspace };
};
