import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2 } from "lucide-react"

export const TaskActions = ({taskId}:{taskId: string}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={30}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-destructive bg-destructive/10">
          <Trash2 className="text-destructive"/> Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}