import { useContext, useState } from "react";
import { gameContext } from "@/context/GameContext";
import { diceMap } from "@/constant/ui.constants";

function BaseDice({ playerStatus }) {
  const {
    diceValue,
    setDiceValue,
    players,
    isRoled,
    setIsRoled,
    activePlayer,
    nextTurn,
  } = useContext(gameContext);

  const currentPlayer = players.find(
    (player) => activePlayer === player.status,
  );

  const allPieceIsInsideHome =
    currentPlayer?.piece?.every((piece) => piece.isHome) ?? false;

  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);
    setIsRoled(true);
    setTimeout(() => {
      setIsRolling(false);
      if (roll < 6 && allPieceIsInsideHome) {
        nextTurn();
        setIsRoled(false);
      }
    }, 500);
  };

  const DiceIcon = diceMap[diceValue];

  return (
    <button
      onClick={rollDice}
      disabled={isRolling || isRoled || activePlayer !== playerStatus}
      className="
        w-16 h-16 flex items-center justify-center
        bg-white border border-gray-300 rounded-xl
        disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
      "
    >
      <DiceIcon
        className={isRolling ? "animate-spin w-12 h-12" : "w-12 h-12"}
      />
    </button>
  );
}

export default BaseDice;
