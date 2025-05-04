"use client";

import { TasksViewSwicher } from "@/app-features/jira/features/tasks/components/tasks-view-swicher";
import { useTaskFilters } from "@/app-features/jira/features/tasks/hooks/use-task-filters";
import { useEffect } from "react";

export default function MyTasksPageClient({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const { setFilter } = useTaskFilters();

  useEffect(() => {
    setFilter({ assigneeId: currentUserId });
  }, [setFilter, currentUserId]);

  return (
    <div>
      <TasksViewSwicher />
    </div>
  );
}
