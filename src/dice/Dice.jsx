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

function Dice({ myPlayer, activePlayer }) {
  const { diceValue, setDiceValue } = useContext(gameContext);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;

    if (activePlayer !== myPlayer) return;

    setIsRolling(true);

    setTimeout(() => {
      const random = Math.floor(Math.random() * 6) + 1;
      setDiceValue(random);

      setIsRolling(false);
    }, 300);
  };

  const DiceIcon = diceMap[diceValue];

  return (
    <button
      onClick={rollDice}
      disabled={isRolling || activePlayer !== myPlayer}
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
