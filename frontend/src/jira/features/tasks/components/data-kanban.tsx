import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { BulkUpdateTasksRequestType, StatusValues, Task } from "../types";
import { Member } from "../../members/types";
import { Project } from "../../projects/types";
import { useCallback, useEffect, useState } from "react";
import { KanbanCard } from "./kanban-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Props = {
  tasks: Task[];
  members: Record<Member["userId"], Member>;
  projects: Record<Project["id"], Project>;
  onTasksChange?: (tasks: BulkUpdateTasksRequestType["tasks"]) => void;
};
type StatusTypes = (typeof StatusValues)[number];
export const DataKanban = ({
  tasks,
  members,
  projects,
  onTasksChange,
}: Props) => {
  const [data, setData] = useState(() => {
    const newTasks: Record<StatusTypes, Task[]> = {
      Backlog: [],
      Todo: [],
      InProgress: [],
      InReview: [],
      Done: [],
    };
    return newTasks;
  });

  useEffect(() => {
    const newTasks: Record<StatusTypes, Task[]> = {
      Backlog: [],
      Todo: [],
      InProgress: [],
      InReview: [],
      Done: [],
    };
    tasks.forEach((task) => {
      newTasks[task.status].push(task);
    });

    Object.keys(newTasks).forEach((key) => {
      newTasks[key as StatusTypes].sort((a, b) => a.position - b.position);
    });

    setData(newTasks);
  }, [tasks]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) return;
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;

      let updates = new Array<{
        id: string;
        status: string;
        position: number;
      }>();

      setData((data) => {
        updates = [];
        const newTasks = { ...data } as Record<string, Task[]>;
        const sourceColumn = [...newTasks[source.droppableId]];
        // update source column
        let updateItem = sourceColumn.splice(source.index, 1)[0];
        updateItem.position = (destination.index + 1) * 1000;
        updateItem.status = destination.droppableId as StatusTypes;
        updateItem = { ...updateItem };
        newTasks[source.droppableId] = sourceColumn;
        if (source.droppableId === destination.droppableId) {
          sourceColumn.splice(destination.index, 0, updateItem);
        } else {
          const destinationColumn = [...newTasks[destination.droppableId]];
          destinationColumn.splice(destination.index, 0, updateItem);
          newTasks[destination.droppableId] = destinationColumn;
        }

        updates.push({
          id: updateItem.id,
          position: updateItem.position,
          status: destination.droppableId,
        });

        // Update tasks position
        newTasks[source.droppableId].forEach((item, index) => {
          const newPosition = (index + 1) * 1000;
          if (item.id !== updateItem.id && newPosition !== item.position) {
            item.position = newPosition;
            updates.push({
              id: item.id,
              status: item.status,
              position: newPosition,
            });
          }
        });

        newTasks[destination.droppableId].forEach((item, index) => {
          const newPosition = (index + 1) * 1000;
          if (item.id !== updateItem.id && newPosition !== item.position) {
            item.position = newPosition;
            updates.push({
              id: item.id,
              status: item.status,
              position: newPosition,
            });
          }
        });

        return newTasks;
      });

      onTasksChange?.(updates);
    },
    [data],
  );

  return (
    <ScrollArea>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-7">
          {StatusValues.map((board) => (
            <div
              key={board}
              className="bg-muted/20 flex w-[300px] flex-1 shrink-0 flex-col rounded-sm border p-2"
            >
              <div className="p-2 font-semibold">{board}</div>
              <Separator />
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[300px] flex-1"
                  >
                    {data[board]?.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="py-2"
                          >
                            <KanbanCard
                              task={task}
                              project={
                                task.projectId ? projects[task.projectId] : null
                              }
                              assignee={
                                task.assigneeId
                                  ? members[task.assigneeId]
                                  : null
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
