import { useContext } from "react";
import { Dialog } from "@/components/ui/dialog";
import { gameContext } from "@/constext/GameContext";
import ConfirmationModal from "./ConfirmationModal";
import ColorSelectModal from "./ColorSelectModal";
import PlayerSelectModal from "./PlayerSelectModal";
import PieceSelectModal from "./PieceSelectModal";
import { useNavigate } from "react-router-dom";
import { defaultPlayers } from "@/constant/player.constants";

const BaseModal = () => {
  const {
    savePlayers,
    isOpenModal,
    setIsOpenModal,
    players,
    setPlayers,
    modalType,
  } = useContext(gameContext);

  const navigate = useNavigate();

  const handleQuit = () => {
    setIsOpenModal(false);
    localStorage.removeItem("players");
    setPlayers(defaultPlayers);
    navigate("/dashboard");
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      {modalType === "Player Select" && (
        <PlayerSelectModal
          title="Select Player"
          content={[2, 4]}
          onClose={() => setIsOpenModal(false)}
          confirm={() => savePlayers()}
        />
      )}

      {modalType === "Piece Select" && (
        <PieceSelectModal
          title="Select Piece"
          content={[2, 4, 6, 8]}
          onClose={() => setIsOpenModal(false)}
          confirm={() => savePlayers()}
        />
      )}

      {modalType === "Color Select" && (
        <ColorSelectModal
          title="Select Color"
          content={players}
          onClose={() => setIsOpenModal(false)}
          confirm={() => savePlayers()}
        />
      )}

      {modalType === "Quite" && (
        <ConfirmationModal
          title="Confirmation"
          content="Are you sure you want to Quite"
          onClose={() => setIsOpenModal(false)}
          confirm={handleQuit}
        />
      )}
    </Dialog>
  );
};

export default BaseModal;
