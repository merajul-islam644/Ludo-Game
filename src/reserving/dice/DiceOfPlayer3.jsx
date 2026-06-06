import { gameContext } from "@/context/GameContextProvider";
import { MapPin } from "lucide-react";
import { useContext } from "react";
import BaseDice from "./BaseDice";
import { colorsMap } from "@/constant/ui.constants";

const DiceOfPlayer3 = () => {
  const { player3 } = useContext(gameContext);
  return (
    <div className={`flex items-center gap-3 mt-1`}>
      <div className="flex flex-col gap-3 items-center">
        {/* <span className="text-xs font-semibold tracking-wide text-white">
          {players.length === 2 ? "Player-2" : "Player-3"}
        </span> */}

        <div
          className="p-2 rounded-lg relative border border-amber-400 bg-amber-100"
          // style={{
          //   boxShadow: `0 0 12px ${colorsMap[player3?.color]}`,
          // }}
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
            className="absolute top-2.5 right-3.75 w-5 h-5 rounded-full border border-slate-500 cursor-pointer"
            style={{ backgroundColor: colorsMap[player3?.color] }}
          />
        </div>
      </div>

      <div
        className="p-2 rounded-xl backdrop-blur-sm transition-all duration-300 border border-amber-300 bg-amber-100"
        // style={{
        //   boxShadow: `0 0 15px ${colorsMap[player3?.color]}`,
        //   border: `1px solid ${colorsMap[player3?.color]}`,
        // }}
      >
        <BaseDice playerStatus={player3?.status} />
      </div>
    </div>
  );
};

export default DiceOfPlayer3;
