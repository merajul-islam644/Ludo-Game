// import { useContext, useState } from "react";
// import { gameContext } from "@/constext/GameContext";
// import { diceMap } from "@/constant/constant";

// function Dice1() {
//   const {
//     diceValue,
//     setDiceValue,
//     players,
//     // isRoled,
//     setIsRoled,
//     activePlayer,
//     player1,
//     nextTurn,
//   } = useContext(gameContext);
//   const [isRolling, setIsRolling] = useState(false);

//   const shouldNextTurn =
//     players
//       .find((player) => player.status === activePlayer)
//       ?.piece?.every((piece) => piece.isHome) ?? false;

//   const rollDice = () => {
//     setIsRoled(true);
//     if (isRolling) return;

//     if (activePlayer !== player1.status) return;

//     setIsRolling(true);

//     setTimeout(() => {
//       const random = Math.floor(Math.random() * 6) + 1;
//       setDiceValue(random);

//       setIsRolling(false);

//       if (diceValue < 6) {
//         if (shouldNextTurn) {
//           nextTurn();
//           setIsRoled(false);
//         }
//       }
//     }, 300);
//   };

//   const DiceIcon = diceMap[diceValue];

//   return (
//     <button
//       onClick={rollDice}
//       disabled={isRolling}
//       className="
//         w-16 h-16 flex items-center justify-center
//         bg-white border border-gray-300 rounded-xl
//         disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
//       "
//     >
//       {activePlayer === player1.status ? (
//         <DiceIcon className={isRolling ? "animate-spin w-8 h-8" : "w-8 h-8"} />
//       ) : (
//         <div className="flex justify-center items-center border-3 rounded border-slate-700">
//           <span className="text-xs py-1">Roll!</span>
//         </div>
//       )}
//     </button>
//   );
// }

// export default Dice1;

import { useContext, useState } from "react";
import { gameContext } from "@/constext/GameContext";
import { diceMap } from "@/constant/constant";

function Dice({ playerStatus }) {
  const {
    diceValue,
    setDiceValue,
    players,
    isRoled,
    setIsRoled,
    activePlayer,
    nextTurn,
  } = useContext(gameContext);

  const allPieceIsInsideHome = players
    .find((player) => activePlayer === player.status)
    .piece.every((piece) => piece.isHome);

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

export default Dice;
