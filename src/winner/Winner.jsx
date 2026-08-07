import {
  colorClasses,
  winnerIconsPosition,
  winnerStatus,
} from "@/constants/constants";

const Winner = ({ player }) => {
  // A player's id doesn't always match their visual slot — in a 2-player
  // game player 2 actually sits in slot 3 (see createPlayers' special-case
  // in GameContextProvider), so the badge's corner has to be derived from
  // their assigned color, not assumed from id.
  const slot = Object.keys(colorClasses).find(
    (key) => colorClasses[key] === player.color,
  );

  return (
    <div
      className={`flex justify-center items-center absolute h-42 w-42 ${winnerIconsPosition[slot]}`}
    >
      <div className="text-8xl font-bold animate-king-pulse">
        {winnerStatus[player.winningStatus]?.icon}
      </div>
    </div>
  );
};

export default Winner;
