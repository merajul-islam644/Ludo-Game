import { useContext } from "react";
import { endZoneTrainglePosition } from "../constants/constants";
import { gameContext } from "@/context/GameContextProvider";

const EndZone = () => {
  const { players } = useContext(gameContext);
  return (
    <div className="relative overflow-hidden w-21 h-21 border border-black">
      {players.map((player) => (
        <div
          key={player.id}
          className={`${endZoneTrainglePosition[player.id - 1]?.className} ${player.color}`}
          style={{
            clipPath:
              players.length === 2 && player.id === 2
                ? endZoneTrainglePosition[player.id]?.style
                : endZoneTrainglePosition[player.id - 1]?.style,
          }}
        />
      ))}

      {/* While players length is 2 */}
      {[2, 3].map((item) => (
        <div
          key={item}
          className={`${endZoneTrainglePosition[1]?.className} ${item === 2 ? "bg-green-500" : "bg-cyan-500"}`}
          style={{
            clipPath:
              players.length === 2 && item === 2
                ? endZoneTrainglePosition[1]?.style
                : endZoneTrainglePosition[3]?.style,
          }}
        ></div>
      ))}
    </div>
  );
};

export default EndZone;
