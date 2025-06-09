"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTaskSchema, PrioritesValue, StatusValues } from "../types";
import { useCreateTask } from "../api/use-create-task";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "../../projects/types";
import { Member } from "../../members/types";
import { ProjectAvatar } from "../../projects/components/project-avatar";
import { MemberAvatar } from "../../members/components/member-avatar";
import { DatePicker } from "@/components/date-picker";
import { useCreateTaskDialog } from "../hooks/use-create-task-dialog";
type CreateWorkspaceFormProps = {
  projectOptions: Project[];
  assigneeOptions: Member[];
};

export const CreateTaskForm = ({
  projectOptions,
  assigneeOptions,
}: CreateWorkspaceFormProps) => {
  const workspaceId = useWorkspaceId();
  const { close } = useCreateTaskDialog();
  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      projectId: "",
      assigneeId: "",
      endDate: null,
      status: "",
    },
  });
  const { mutate } = useCreateTask();

  const onFormSubmit = (data: z.infer<typeof createTaskSchema>) => {
    mutate({ workspaceId, data }, {onSuccess:  close});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new Task</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Task Name" />
                  </FormControl>
                  {error && (
                    <p className="text-destructive/80 text-sm">
                      {error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a project</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectOptions.map((item) => (
                          <SelectItem value={item.id} key={item.id}>
                            <ProjectAvatar
                              imgUrl={item.imgUrl}
                              name={item.name}
                              className="size-7"
                            />
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a assignee</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        {assigneeOptions.map((item) => (
                          <SelectItem
                            value={item.userId}
                            key={item.userId}
                            className=""
                          >
                            <MemberAvatar className="size-7" name={item.name} />
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {StatusValues.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {PrioritesValue.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Due Date</FormLabel>
                  <DatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </FormItem>
              )}
            />

            <div className="mt-10 flex">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button className="ml-auto">Create</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
