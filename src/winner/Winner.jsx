import { winnerIconsPosition, winnerStatus } from "@/constants/constants";

const Winner = ({ player }) => {
  return (
    <div
      className={`flex justify-center items-center absolute h-42 w-42 ${winnerIconsPosition[player.id]}`}
    >
      <div className="text-8xl font-bold animate-king-pulse">
        {winnerStatus[player.winningStatus]?.icon}
      </div>
    </div>
  );
};

export default Winner;
