import { createColumnHelper } from "@tanstack/react-table";
import { Task } from "../types";
import { Member } from "../../members/types";
import { Project } from "../../projects/types";
import { ProjectAvatar } from "../../projects/components/project-avatar";
import { MemberAvatar } from "../../members/components/member-avatar";
import { TaskActions } from "./task-actions";
import { StatusBadge } from "./status-badge";
import { TaskDate } from "./task-date";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical } from "lucide-react";

type DataType = {
  task: Task;
  assignee?: Member | null;
  project?: Project | null;
};
const columnHelper = createColumnHelper<DataType>();

export const columns = [
  columnHelper.accessor("task.name", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      const name = info.getValue();
      return <p className="line-clamp-1">{name}</p>;
    },
  }),
  columnHelper.accessor("project", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      const project = info.getValue();

      return !!project ? (
        <div className="flex items-center">
          <ProjectAvatar
            className="mr-2.5"
            imgUrl={project.imgUrl}
            name={project.name}
          />
          <p className="line-clamp-1">{project.name}</p>
        </div>
      ) : null;
    },
  }),
  columnHelper.accessor("assignee", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assignee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      const assignee = info.getValue();
      return !!assignee ? (
        <div className="flex items-center">
          <MemberAvatar name={assignee.name} className="mr-2.5 size-6" />
          <p className="line-clamp-1">{assignee.name}</p>
        </div>
      ) : null;
    },
  }),

  columnHelper.accessor("task.endDate", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      const dueDate = info.getValue();

      return <TaskDate value={dueDate} />;
    },
  }),
  columnHelper.accessor("task.status", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      const status = info.getValue();
      return <StatusBadge variant={status}>{status}</StatusBadge>;
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const taskId = row.original.task.id;
      return (
        <TaskActions taskId={taskId} projectId={row.original.project?.id}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </TaskActions>
      );
    },
  }),
];
