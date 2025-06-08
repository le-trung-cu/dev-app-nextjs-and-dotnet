import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { TaskStatus } from "../types";

const priorityBadgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        Medium: "border-transparent bg-yellow-400 hover:bg-yellow-400/80",
        High: "border-transparent bg-red-400 hover:bg-red-400/80",
        Low: "border-transparent bg-gray-300 hover:bg-gray-400/80",
      },
    },
    defaultVariants: {
      variant: "Medium",
    },
  },
);

interface SatatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priorityBadgeVariants> {}

function PriorityBadge({ className, variant, ...props }: SatatusBadgeProps) {
  return (
    <div
      className={cn(priorityBadgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { PriorityBadge, priorityBadgeVariants };
