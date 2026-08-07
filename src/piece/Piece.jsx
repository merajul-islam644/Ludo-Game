import { useContext } from "react";
import { Loader, MapPin } from "lucide-react";
import { endZone } from "@/constants/constants";
import { gameContext } from "@/context/GameContextProvider";
import { useMovePiece } from "@/hooks/useMovePiece";

const Piece = ({ piece, checkingLength }) => {
  const { diceValue, currentPlayerId, hasRoled, gameMode, myPlayerId } =
    useContext(gameContext);
  const movePiece = useMovePiece();

  const canControl = gameMode !== "online" || myPlayerId === piece.retrieveId;

  const handleScale = (length) => {
    if (
      currentPlayerId === piece.retrieveId &&
      hasRoled &&
      !endZone.includes(piece.currentPosition)
    ) {
      return "scale-[12px]";
    }
    switch (length) {
      case 1:
        return "";

      case 2:
        return "scale-[0.60]";

      default:
        return "scale-[0.50]";
    }
  };

  return (
    <div
      className={`flex items-center justify-center ${handleScale(checkingLength)}`}
    >
      <div
        className="relative"
        onClick={() => {
          if (
            currentPlayerId === piece.retrieveId &&
            canControl &&
            hasRoled &&
            piece.stepsMoved + diceValue <= 56
          ) {
            movePiece(piece.retrieveId, piece.id);
          }
        }}
      >
        {/* Map Pin Icon */}
        <MapPin
          fill="white"
          strokeWidth={1}
          className="absolute z-10 h-12.5 w-8.75 -top-7 left-1/2 -translate-x-1/2"
        />

        {/* Base Circle */}
        <div className="absolute border-4 border-black h-5 w-5 rounded-full -top-px left-1/2 -translate-x-1/2" />

        {currentPlayerId === piece.retrieveId &&
          hasRoled &&
          !endZone.includes(piece.currentPosition) && (
            <Loader
              size={30}
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 animate-spin"
            />
          )}

        {/* Player Indicator */}
        <div
          className={`absolute z-30 border-2 border-black h-5 w-5 rounded-full -top-3.75 left-1/2 -translate-x-1/2 ${piece?.color}`}
        />
      </div>
    </div>
  );
};

export default Piece;
