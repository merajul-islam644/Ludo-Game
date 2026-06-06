import { useContext } from "react";
import Piece from "../piece/Piece";
import { gameContext } from "../context/GameContextProvider";

const SafeZonePiecesPositionComponent = ({ position, safeZoneNumber }) => {
  const { players } = useContext(gameContext);

  const preservePiece = players
    .flatMap((player) => player.pieces)
    .filter((piece) => piece.currentPosition === safeZoneNumber);

  const checkingLength = preservePiece.length;

  const handleLength = (length) => {
    switch (length) {
      case 1:
        return "";

      case 2:
        return "grid-cols-2";

      case 3:
        return "grid-cols-2";

      case 4:
        return "grid-cols-2";

      case 6:
        return "grid-cols-3";

      default:
        break;
    }
  };

  return (
    <div className={`absolute ${position}`}>
      <div
        className={`grid ${handleLength(checkingLength)} grid-rows-2 h-7 w-7`}
      >
        {preservePiece.map((piece, index) => (
          <Piece
            key={`${piece.id}-${index}`}
            piece={piece}
            checkingLength={checkingLength}
          />
        ))}
      </div>
    </div>
  );
};

export default SafeZonePiecesPositionComponent;
