import { parseAsBoolean, useQueryState } from "nuqs";

export const useCreateTaskDialog = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ shallow: true }),
  );

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    onOpenChange: (open: boolean) => setIsOpen(open),
  };
};
