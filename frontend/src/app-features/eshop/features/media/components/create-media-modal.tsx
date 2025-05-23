import { ReponsiveDialog } from "@/app-features/eshop/components/reponsive-dialog";
import { CreateMedia } from "./create-media";
import { useCreateMediaModal } from "../stores";

export const CreateMediaModal = () => {
  const [isOpen, setIsOpen] = useCreateMediaModal();
  return (
    <ReponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
      <CreateMedia />
    </ReponsiveDialog>
  );
};
