import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { SelectColor } from "../dashboard/select-color/SelectColor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { gameContext } from "@/constext/GameContext";

const Modal = ({ title, content, onClose, confirm }) => {
  const { setShouldSave, isOpenModal, setIsOpenModal, players } =
    useContext(gameContext);

  const isArray = Array.isArray(content);

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogContent className="sm:max-w-md rounded">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {isArray
            ? players.map((player) => (
                <SelectColor key={player.id} player={player} />
              ))
            : content}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="destructive"
            onClick={onClose}
            className="rounded cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              isArray ? setShouldSave(true) : confirm?.();
            }}
            className="bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer"
          >
            {isArray ? "Save" : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
