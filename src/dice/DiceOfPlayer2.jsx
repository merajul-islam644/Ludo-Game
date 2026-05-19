import { gameContext } from "@/context/GameContext";
import { MapPin } from "lucide-react";
import { useContext } from "react";
import BaseDice from "./BaseDice";
import { colorsMap } from "@/constant/ui.constants";

const DiceOfPlayer2 = () => {
  const { activePlayer, player2 } = useContext(gameContext);
  return (
    <div
      className={`flex items-center gap-3 ${activePlayer === player2?.status && "animate-[pulse_0.5s_infinite]"}`}
    >
      <div className="flex flex-col gap-3 items-center">
        <div
          className={`p-2 rounded-full relative`}
          style={{
            boxShadow: `0 0 12px ${colorsMap[player2?.color]}`,
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
            style={{ backgroundColor: colorsMap[player2?.color] }}
          />
        </div>
        <span className="text-xs font-semibold tracking-wide">Player-2</span>
      </div>

      <div
        className={`p-2 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 ${activePlayer === player2?.status && "animate-pulse"}`}
        style={{
          boxShadow: `0 0 15px ${colorsMap[player2?.color]}`,
          border: `1px solid ${colorsMap[player2?.color]}`,
        }}
      >
        <BaseDice playerStatus={player2?.status} />
      </div>
    </div>
  );
};

export default DiceOfPlayer2;
