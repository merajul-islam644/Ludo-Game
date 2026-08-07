import { useContext, useState } from "react";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, MapPin } from "lucide-react";
import { gameContext } from "@/context/GameContextProvider";

const DiceBox = ({ player, side, position }) => {
  const isLeft = side === "left";
  const dices = {
    1: <Dice1 size={59} />,
    2: <Dice2 size={59} />,
    3: <Dice3 size={59} />,
    4: <Dice4 size={59} />,
    5: <Dice5 size={59} />,
    6: <Dice6 size={59} />,
  };

  const {
    diceValue,
    setDiceValue,
    currentPlayerId,
    setHasRoled,
    hasRoled,
    gameMode,
    myPlayerId,
    turnSecondsLeft,
    turnTimeLimit,
  } = useContext(gameContext);
  const [isRolling, setIsRolling] = useState(false);

  const canControl = gameMode !== "online" || myPlayerId === player.id;
  const isDisabled = player.id !== currentPlayerId || !canControl || hasRoled;
  const isMyTurn =
    gameMode === "online" && player.id === currentPlayerId && !hasRoled;
  const timePercent = Math.max(0, (turnSecondsLeft / turnTimeLimit) * 100);
  const barPosition = player.id === 1 || player.id === 2 ? "-top-1.5" : "-bottom-1.5";

  const handleRollDice = () => {
    setIsRolling(true);

    setTimeout(() => {
      const rollValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(rollValue);
      setIsRolling(false);
      setHasRoled(true);
    }, 100);
  };

  return (
    <div className={`absolute ${position}`}>
      {/* Dice */}
      {isLeft ? (
        <div className="flex justify-center items-center ">
          <div className="relative h-15 w-15 border rounded-r flex items-center justify-center bg-white">
            <button
              disabled={isDisabled}
              onClick={handleRollDice}
              className={`${isDisabled ? "cursor-not-allowed" : ""} ${isRolling ? "ludo-dice" : ""}`}
            >
              {dices[diceValue]}
            </button>
            {isMyTurn && (
              <div
                key={currentPlayerId}
                className={`absolute ${barPosition} left-0 w-full h-1.5 rounded-full bg-black/20 overflow-hidden`}
              >
                <div
                  className="h-full bg-red-500"
                  style={{
                    width: `${timePercent}%`,
                    transition: "width 1s linear",
                  }}
                />
              </div>
            )}
          </div>

          {/* Player Box */}
          <div
            className={`h-11 w-11 border relative bg-white ${
              isLeft ? "rounded-r" : "rounded-l"
            }`}
          >
            <div className="absolute left-5 top-4.5">
              <MapPin
                fill="white"
                strokeWidth={1}
                className="absolute z-10 h-12.5 w-8.75 -top-5.5 left-1/2 -translate-x-1/2"
              />

              <div
                className={`absolute z-30 border-2 border-black h-5 w-5 rounded-full -top-2.5 left-1/2 -translate-x-1/2 ${player?.color}`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {/* Player Box */}
          <div
            className={`h-11 w-11 border relative bg-white ${
              isLeft ? "rounded-r" : "rounded-l"
            }`}
          >
            <div className="absolute left-5 top-4.5">
              <MapPin
                fill="white"
                strokeWidth={1}
                className="absolute z-10 h-12.5 w-8.75 -top-5.5 left-1/2 -translate-x-1/2"
              />

              <div
                className={`absolute z-30 border-2 border-black h-5 w-5 rounded-full -top-2.5 left-1/2 -translate-x-1/2 ${player?.color}`}
              />
            </div>
          </div>
          <div className="relative h-15 w-15 border rounded-l flex items-center justify-center bg-white">
            <button
              disabled={isDisabled}
              onClick={handleRollDice}
              className={`${isDisabled ? "cursor-not-allowed" : ""} ${isRolling ? "ludo-dice" : ""}`}
            >
              {dices[diceValue]}
            </button>
            {isMyTurn && (
              <div
                key={currentPlayerId}
                className={`absolute ${barPosition} left-0 w-full h-1.5 rounded-full bg-black/20 overflow-hidden`}
              >
                <div
                  className="h-full bg-red-500"
                  style={{
                    width: `${timePercent}%`,
                    transition: "width 1s linear",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceBox;
