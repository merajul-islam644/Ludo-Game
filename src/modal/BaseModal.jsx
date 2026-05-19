import { useContext } from "react";
import { Dialog } from "@/components/ui/dialog";
import { gameContext } from "@/context/GameContext";
import ConfirmationModal from "./ConfirmationModal";
import ColorSelectModal from "./ColorSelectModal";
import PlayerSelectModal from "./PlayerSelectModal";
import PieceSelectModal from "./PieceSelectModal";
import { useNavigate } from "react-router-dom";
import { defaultPlayers } from "@/constant/player.constants";

const BaseModal = () => {
  const { savePlayers, players, setPlayers, activeModal, dispatch } =
    useContext(gameContext);

  const navigate = useNavigate();

  const handleQuit = () => {
    dispatch({ type: "CLOSE_MODAL" });
    localStorage.removeItem("players");
    setPlayers(defaultPlayers);
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
          content={[2, 4]}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          confirm={() => savePlayers()}
        />
      )}

      {activeModal === "SELECT_PIECE" && (
        <PieceSelectModal
          title="Select Piece"
          content={[2, 4, 6, 8]}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          confirm={() => savePlayers()}
        />
      )}

      {activeModal === "SELECT_COLOR" && (
        <ColorSelectModal
          title="Select Color"
          content={players}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          confirm={() => savePlayers()}
        />
      )}

      {activeModal === "QUIT" && (
        <ConfirmationModal
          title="Confirmation"
          content="Are you sure you want to Quite"
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          confirm={handleQuit}
        />
      )}
    </Dialog>
  );
};

export default BaseModal;
