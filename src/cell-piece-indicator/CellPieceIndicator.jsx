import { Loader } from "lucide-react";

const CellPieceIndicator = ({ activePlayer, players, isRoled, allPath }) => {
  return (
    <div>
      <div>
        {players
          .find((player) => player.status === activePlayer)
          .piece.some(
            (p) => p.currentPosition === allPath || p.position === allPath,
          ) &&
          isRoled && <Loader className="animate-spin" />}
      </div>
      {players.some((player) =>
        player.piece.some(
          (p) => p.currentPosition === allPath || p.position === allPath,
        ),
      ) && (
        <div
          className={`border-3 border-slate-500 h-5 w-5 rounded-full bg-white ${isRoled && "hidden"}`}
        />
      )}
    </div>
  );
};

export default CellPieceIndicator;
