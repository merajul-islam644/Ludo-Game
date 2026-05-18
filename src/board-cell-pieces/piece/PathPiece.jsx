import { endZone, safeZone } from "@/constant/boardPaths.constants";
import { colorsMap } from "@/constant/ui.constants";
import { MapPin } from "lucide-react";

const PathPiece = ({
  player,
  piece,
  activePlayer,
  isRoled,
  handleIncreacseStep,
  allPath,
  nextTurn,
}) => {
  return player?.path?.map((p, index) =>
    p === allPath && index === piece.stepsMoved ? (
      <div
        key={`${player.status}-${piece.id}-${index}`}
        onClick={() => {
          if (
            activePlayer === player.status &&
            isRoled &&
            !safeZone.includes(p) &&
            !endZone.includes(p)
          ) {
            handleIncreacseStep(player.status, piece.id, nextTurn);
          }
        }}
        className="absolute z-10 right-0.5 -top-4.5 w-[30px] h-[30px] cursor-pointer"
      >
        <MapPin
          size={35}
          color="white"
          fill="white"
          className="cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
          style={{ transform: "scale(0.9, 1)" }}
        />

        <div
          className="absolute top-[2px] left-[7.5px] w-5 h-5 rounded-full border border-slate-500"
          style={{ backgroundColor: colorsMap[player.color] }}
        />
      </div>
    ) : null,
  );
};

export default PathPiece;
