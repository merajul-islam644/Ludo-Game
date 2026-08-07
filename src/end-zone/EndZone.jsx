import { useContext } from "react";
import { colorClasses, endZoneTrainglePosition } from "../constants/constants";
import { gameContext } from "@/context/GameContextProvider";

const EndZone = () => {
  const { players } = useContext(gameContext);

  // A player's id doesn't always match their visual slot — in a 2-player
  // game player 2 actually sits in slot 3 (see createPlayers' special-case
  // in GameContextProvider), so the slot has to be derived from their
  // assigned color, not assumed from id.
  const slotForColor = (color) =>
    Number(Object.keys(colorClasses).find((slot) => colorClasses[slot] === color));

  const usedColors = new Set(players.map((p) => p.color));
  const unusedSlots = [1, 2, 3, 4].filter(
    (slot) => !usedColors.has(colorClasses[slot]),
  );

  return (
    <div className="relative overflow-hidden w-21 h-21 border border-black">
      {players.map((player) => {
        const slot = slotForColor(player.color);
        return (
          <div
            key={player.id}
            className={`${endZoneTrainglePosition[slot - 1]?.className} ${player.color}`}
            style={{ clipPath: endZoneTrainglePosition[slot - 1]?.style }}
          />
        );
      })}

      {/* Decorative fill for slots with no real player in them, so the
          finish center doesn't have a blank wedge. */}
      {unusedSlots.map((slot) => (
        <div
          key={slot}
          className={`${endZoneTrainglePosition[slot - 1]?.className} ${colorClasses[slot]}`}
          style={{ clipPath: endZoneTrainglePosition[slot - 1]?.style }}
        />
      ))}
    </div>
  );
};

export default EndZone;
