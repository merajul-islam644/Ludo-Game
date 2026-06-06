import { colorsMap } from "@/constant/ui.constants";
import { gameContext } from "@/context/GameContextProvider";
import { getShowLoader, getShowTile } from "@/game-engine/cellIndicator";
import { useActivatePiece } from "@/hooks/useActivatePiece";
import { Loader, MapPin } from "lucide-react";
import { useContext } from "react";

const HomePiece = ({ player, piece, activePlayer, isRoled, allPath }) => {
  const { activatePiece } = useActivatePiece();
  const { diceValue, players } = useContext(gameContext);
  const showLoader = getShowLoader(players, activePlayer, allPath, diceValue);
  const showTile = getShowTile(players, allPath);
  return (
    <div
      onClick={() => {
        if (activePlayer === player.status && isRoled) {
          activatePiece(
            player.status,
            piece.id,
            allPath,
            player.currentPosition,
          );
        }
      }}
      className="absolute z-50 -left-4.5 -top-7 flex items-center justify-center cursor-pointer"
    >
      {/* Pin */}
      <MapPin
        size={35}
        color="white"
        fill="white"
        className="drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
        style={{ transform: "scale(0.9, 1)" }}
      />

      {/* Piece */}
      <div
        className="absolute top-0.5 h-5 w-5 rounded-full border border-slate-500"
        style={{
          backgroundColor: colorsMap[player.color],
        }}
      />

      {showLoader && isRoled ? (
        <Loader className="absolute left-1.5 top-5 animate-spin -z-10" />
      ) : (
        showTile && (
          <div className="absolute top-5 border-3 border-slate-500 -z-10 h-5 w-5 rounded-full" />
        )
      )}
    </div>
  );
};

export default HomePiece;
