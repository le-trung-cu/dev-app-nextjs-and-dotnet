import { useGetWorkspaces } from "./use-get-workspaces";

export const useGetWorkspace = ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const result = useGetWorkspaces();
  const workspace = result.data?.find((x) => x.id === workspaceId);
  console.log(workspace)
  return { ...result, data: workspace };
};
