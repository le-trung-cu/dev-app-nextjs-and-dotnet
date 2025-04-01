import { parseAsBoolean, useQueryState } from "nuqs";

export const useCreateWorkspaceDialog = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-workspace",
    parseAsBoolean.withDefault(false).withOptions({ shallow: true }),
  );

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    onOpenChange: (open: boolean) => setIsOpen(open),
  };
};
