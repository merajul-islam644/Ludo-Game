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
    setTestingPiece,
  } = useContext(gameContext);
  const [isRolling, setIsRolling] = useState(false);

  const handleRollDice = () => {
    setIsRolling(true);

    setTimeout(() => {
      const rollValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(rollValue);
      setIsRolling(false);
      setHasRoled(true);
      setTestingPiece(true);
    }, 100);
  };

  return (
    <div className={`absolute ${position}`}>
      {/* Dice */}
      {isLeft ? (
        <div className="flex justify-center items-center ">
          <div className="h-15 w-15 border rounded-r flex items-center justify-center bg-white">
            <button
              disabled={player.id !== currentPlayerId || hasRoled}
              onClick={handleRollDice}
              className={`${player.id !== currentPlayerId ? "cursor-not-allowed" : ""} ${isRolling ? "ludo-dice" : ""}`}
            >
              {dices[diceValue]}
            </button>
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
          <div className="h-15 w-15 border rounded-l flex items-center justify-center bg-white">
            <button
              disabled={player.id !== currentPlayerId || hasRoled}
              onClick={handleRollDice}
              className={`${player.id !== currentPlayerId ? "cursor-not-allowed" : ""} ${isRolling ? "ludo-dice" : ""}`}
            >
              {dices[diceValue]}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceBox;
