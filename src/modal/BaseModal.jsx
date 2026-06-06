import { useContext } from "react";
import { Dialog } from "@/components/ui/dialog";
import { gameContext } from "@/context/GameContextProvider";
import ConfirmationModal from "./ConfirmationModal";
import ColorSelectModal from "./ColorSelectModal";
import PlayerSelectModal from "./PlayerSelectModal";
import PieceSelectModal from "./PieceSelectModal";
import { useNavigate } from "react-router-dom";

const BaseModal = () => {
  const { players, activeModal, dispatch } = useContext(gameContext);

  const navigate = useNavigate();

  const handleQuit = () => {
    dispatch({ type: "CLOSE_MODAL" });
    navigate("/dashboard");
  };

  return (
    <Dialog
      open={activeModal !== null}
      onOpenChange={() => dispatch({ type: "CLOSE_MODAL" })}
    >
      {activeModal === "SELECT_PLAYER" && (
        <PlayerSelectModal
          title="Select Player"
          content={[2, 3, 4, 5, 6, 7, 8, 9, 10]}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          confirm={() => dispatch({ type: "CLOSE_MODAL" })}
        />
      )}

      {activeModal === "SELECT_PIECE" && (
        <PieceSelectModal
          title="Select Piece"
          content={[1, 2, 3, 4, 5, 6]}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          confirm={() => dispatch({ type: "CLOSE_MODAL" })}
        />
      )}

      {activeModal === "SELECT_COLOR" && (
        <ColorSelectModal
          title="Select Color"
          content={players}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          confirm={() => dispatch({ type: "CLOSE_MODAL" })}
        />
      )}

      {activeModal === "QUIT" && (
        <ConfirmationModal
          title="Confirmation"
          content="Are you sure you want to Quite?"
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          confirm={handleQuit}
        />
      )}
    </Dialog>
  );
};

export default BaseModal;
