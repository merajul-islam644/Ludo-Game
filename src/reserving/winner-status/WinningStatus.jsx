import { gameContext } from "@/context/GameContextProvider";
import { useContext } from "react";

const WinningStatus = () => {
  const { player1, player2, player3, player4 } = useContext(gameContext);
  return (
    <div className="absolute z-50">
      {/* Top Right */}
      {player1?.status === "player-1" && (
        <div className="absolute -top-44 -left-47 text-red-500 text-8xl">
          {player1.winningStatus === 1
            ? "🏆"
            : player1.winningStatus === 2
              ? "🥈"
              : player1.winningStatus === 3
                ? "🥉"
                : ""}
        </div>
      )}

      {/* Top Left */}
      {player2?.status === "player-2" && (
        <div className="absolute -top-43.5 -right-48 text-red-500 text-8xl">
          {player2.winningStatus === 1
            ? "🏆"
            : player2.winningStatus === 2
              ? "🥈"
              : player2.winningStatus === 3
                ? "🥉"
                : ""}
        </div>
      )}

      {/* Bottom Right */}
      {player3?.status === "player-3" && (
        <div className="absolute -bottom-43.5 -right-48 text-red-500 text-8xl">
          {player3.winningStatus === 1
            ? "🏆"
            : player3.winningStatus === 2
              ? "🥈"
              : player3.winningStatus === 3
                ? "🥉"
                : ""}
        </div>
      )}

      {/* Bottom Left */}
      {player4?.status === "player-4" && (
        <div className="absolute -bottom-34 -left-39 text-red-500">
          {player4.winningStatus === 1
            ? "🏆"
            : player4.winningStatus === 2
              ? "🥈"
              : player4.winningStatus === 3
                ? "🥉"
                : ""}
        </div>
      )}
    </div>
  );
};

export default WinningStatus;
