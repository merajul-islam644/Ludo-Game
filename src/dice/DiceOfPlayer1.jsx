import { gameContext } from "@/constext/GameContext";
import { useContext } from "react";
import BaseDice from "./BaseDice";
import { MapPin } from "lucide-react";
import { colorsMap } from "@/constant/ui.constants";

const DiceOfPlayer1 = () => {
  const { activePlayer, player1 } = useContext(gameContext);
  return (
    <div
      className={`flex items-center gap-3 ${activePlayer === player1.status && "animate-[pulse_0.5s_infinite]"}`}
    >
      <div
        className={`p-2 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300`}
        style={{
          boxShadow: `0 0 15px ${colorsMap[player1?.color]}`,
          border: `1px solid ${colorsMap[player1?.color]}`,
        }}
      >
        <BaseDice playerStatus={player1.status} />
      </div>

      <div className="flex flex-col gap-3 items-center">
        <div
          className={`p-2 rounded-full relative`}
          style={{
            boxShadow: `0 0 12px ${colorsMap[player1?.color]}`,
          }}
        >
          <MapPin
            size={35}
            color="white"
            fill="white"
            className="cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
            style={{
              transform: "scale(0.9, 1)",
            }}
          />
          <div
            className="absolute top-3 left-4 w-5 h-5 rounded-full border border-slate-500 cursor-pointer"
            style={{ backgroundColor: colorsMap[player1.color] }}
          />
        </div>
        <span className="text-xs font-semibold tracking-wide">Player-1</span>
      </div>
    </div>
  );
};

export default DiceOfPlayer1;
