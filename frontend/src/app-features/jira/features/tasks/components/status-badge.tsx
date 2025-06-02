import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { TaskStatus } from "../types";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        Todo:
          "border-transparent bg-red-400 hover:bg-red-400/80",
        InProgress:
          "border-transparent bg-yellow-400 hover:bg-yellow-400/80",
        InReview:
          "border-transparent bg-blue-400 hover:bg-blue-400/80",
        Done:
          "border-transparent bg-emerald-400 hover:bg-emerald-400/80",
        Backlog:
          "border-transparent bg-pink-400 hover:bg-pink-400/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface SatatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

function StatusBadge({ className, variant, ...props }: SatatusBadgeProps) {
  return (
    <div
      className={cn(statusBadgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { StatusBadge, statusBadgeVariants };
