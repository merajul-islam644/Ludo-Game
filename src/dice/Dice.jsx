import { useContext, useState } from "react";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import { gameContext } from "@/constext/GameContext";

const diceMap = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

function Dice({ myPlayer, activePlayer, nextTurn }) {
  const { diceValue, setDiceValue, players, isRoled, setIsRoled } =
    useContext(gameContext);
  const [isRolling, setIsRolling] = useState(false);

  const shouldNextTurn =
    players
      .find((player) => player.status === activePlayer)
      ?.piece?.every((piece) => piece.isHome) ?? false;

  const rollDice = () => {
    setIsRoled(true);
    if (isRolling) return;

    if (activePlayer !== myPlayer) return;

    setIsRolling(true);

    setTimeout(() => {
      const random = Math.floor(Math.random() * 6) + 1;
      setDiceValue(random);

      setIsRolling(false);

      if (diceValue < 6) {
        if (shouldNextTurn) {
          nextTurn();
          setIsRoled(false);
        }
      }
    }, 300);
  };

  const DiceIcon = diceMap[diceValue];

  return (
    <button
      onClick={rollDice}
      disabled={isRolling || activePlayer !== myPlayer || isRoled}
      className="
        w-16 h-16 flex items-center justify-center
        bg-white border border-gray-300 rounded-xl
        disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
      "
    >
      <DiceIcon className={isRolling ? "animate-spin w-8 h-8" : "w-8 h-8"} />
    </button>
  );
}

export default Dice;
