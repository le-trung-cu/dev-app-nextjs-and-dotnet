import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Member } from "../../members/types";
import { Project } from "../../projects/types";
import { useTaskFilters } from "../hooks/use-task-filters";
import { MemberAvatar } from "../../members/components/member-avatar";
import { ProjectAvatar } from "../../projects/components/project-avatar";
import { StatusValues } from "../types";
import { DatePicker } from "@/components/date-picker";
import { format } from "date-fns";

type DataFilterProps = {
  projectOptions: Project[];
  assigneeIdOptions: Member[];
};
export const DataFilter = ({
  projectOptions,
  assigneeIdOptions,
}: DataFilterProps) => {
  const { filter, setFilter } = useTaskFilters();

  const onFilterChange = (name: string, value: string | null) => {
    setFilter({ [name]: value });
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={filter.projectId ?? undefined}
        onValueChange={(value) => onFilterChange("projectId", value)}
      >
        <SelectTrigger className="" size="sm">
          <SelectValue placeholder="All projects" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-muted-foreground">
            All projects
          </SelectItem>
          {projectOptions.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              <ProjectAvatar className="size-7" imgUrl={item.imgUrl} name={item.name} />
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filter.assigneeId ?? undefined}
        onValueChange={(value) => onFilterChange("assigneeId", value)}
      >
        <SelectTrigger className="" size="sm">
          <SelectValue placeholder="All assignee" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-muted-foreground">
            All assignee
          </SelectItem>
          {assigneeIdOptions.map((item) => (
            <SelectItem key={item.userId} value={item.userId}>
              <MemberAvatar className="size-7" name={item.name} />
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filter.status ?? undefined}
        onValueChange={(value) => onFilterChange("status", value)}
      >
        <SelectTrigger className="" size="sm">
          <SelectValue placeholder="All status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-muted-foreground">
            All status
          </SelectItem>
          {StatusValues.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        <DatePicker
          className="h-8"
          selected={filter.endDate ? new Date(filter.endDate) : null}
          onSelect={(value) =>
            onFilterChange("endDate", value ? value.toISOString() : null)
          }
        />
      </div>
    </div>
  );
};
