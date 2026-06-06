import { useContext } from "react";
import Piece from "../piece/Piece";
import { gameContext } from "@/context/GameContextProvider";

const EndZonePiecesPositionComponent = ({ position, endZoneNumber }) => {
  const { players } = useContext(gameContext);

  const preservePiece = players
    .flatMap((player) => player.pieces)
    .filter((piece) => piece.currentPosition === endZoneNumber);

  return (
    <div className={`absolute ${position}`}>
      <div className="grid grid-cols-3 grid-rows-2 h-7 w-7">
        {preservePiece.map((piece, index) => (
          <Piece key={`${piece.id}-${index}`} piece={piece} />
        ))}
      </div>
    </div>
  );
};

export default EndZonePiecesPositionComponent;
