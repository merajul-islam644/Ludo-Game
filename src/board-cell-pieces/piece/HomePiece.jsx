import { colorsMap } from "@/constant/ui.constants";
import { MapPin } from "lucide-react";

const HomePiece = ({
  player,
  piece,
  activePlayer,
  isRoled,
  handleToggle,
  allPath,
}) => {
  return (
    <div
      onClick={() => {
        if (activePlayer === player.status && isRoled) {
          handleToggle(player.status, piece.id, allPath);
        }
      }}
      className="absolute z-10 right-0.5 -top-4.5 w-[30px] h-[30px]"
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
  );
};

export default HomePiece;
