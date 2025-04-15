import { parseAsBoolean, useQueryState } from "nuqs";

export const useCreateProjectDialog = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-project",
    parseAsBoolean.withDefault(false).withOptions({ shallow: true }),
  );

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    onOpenChange: (open: boolean) => setIsOpen(open),
  };
};
