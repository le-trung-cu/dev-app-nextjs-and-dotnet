import { createColumnHelper } from "@tanstack/react-table";
import { Task } from "../types";
import { Member } from "../../members/types";
import { Project } from "../../projects/types";
import { ProjectAvatar } from "../../projects/components/project-avatar";
import { MemberAvatar } from "../../members/components/member-avatar";
import { TaskActions } from "./task-actions";

type DataType = { task: Task; assignee?: Member | null; project?: Project | null };
const columnHelper = createColumnHelper<DataType>();

export const columns = [
  columnHelper.accessor("task.name", {
    header: "Name",
  }),
  columnHelper.accessor("project", {
    header: "Project",
    cell: (info) => {
      const project = info.getValue();

      return !!project ? (
        <div className="flex items-center">
          <ProjectAvatar
            className="mr-2.5"
            imgUrl={project.imgUrl}
            name={project.name}
          />
          {project.name}
        </div>
      ) : null;
    },
  }),
  columnHelper.accessor("assignee", {
    header: "Assignee",
    cell: (info) => {
      const assignee = info.getValue();
      return !!assignee ? (
        <div className="flex items-center">
          <MemberAvatar name={assignee.name} className="mr-2.5 size-6" />
          {assignee.name}
        </div>
      ) : null;
    },
  }),
  columnHelper.accessor("task.status", {
    header: "Status",
  }),
  columnHelper.accessor("task.endDate", {
    header: "Duedate",
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const taskId = row.original.task.id;
      return <TaskActions taskId={taskId} />;
    },
  }),
];
