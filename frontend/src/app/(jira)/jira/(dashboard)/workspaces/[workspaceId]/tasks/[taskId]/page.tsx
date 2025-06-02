import { TaskIdClient } from "./client";

type Props = {
  params: Promise<{
    workspaceId: string;
    taskId: string;
  }>
}

export default async function TaskIdPage ({params} : Props) {
  const {workspaceId, taskId} = await params;
  return (
   <TaskIdClient workspaceId={workspaceId} taskId={taskId}/>
  )
}