import { z } from "zod";
import { Member } from "../members/types";

export const createTaskSchema = z.object({
  name: z.string().min(1),
  projectId: z.string(),
  assigneeId: z.string(),
  status: z.string(),
  endDate: z.date().nullish(),
});

export type GetTasksRequestType = {
  workspaceId: string;
  projectId?: string | null;
  assigneeId?: string | null;
  status?: string | null;
  endDate?: string | null;
};

export type GetTasksResponseType = {
  isSuccess: true;
  tasks: Task[];
  members: Member[];
}

export type Task = {
  id: string,
  name: string,
  workspaceId: string;
  projectId?: string | null;
  assigneeId?: string | null;
  status: "Backlog" | "Todo" | "InProgress" | "InReview" | "Done";
  endDate?: string | null;
  position: number;
}

export const StatusValues = ["Backlog" , "Todo" , "InProgress" , "InReview" , "Done"] as const;
