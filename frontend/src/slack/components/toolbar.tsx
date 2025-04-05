import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="flex">
      <div className="flex-1"></div>
      <div className="flex-2">
        <Label className="relative">
          <Search className="text-muted-foreground absolute left-2" />
          <Input className="w-full pl-10" placeholder="Type to search..." />
        </Label>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};
