import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaRegStar,
} from "react-icons/fa";

import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import { borderArray3, mergedBorderArray } from "./boardPaths.constants";

export const colorsMap = {
  "bg-red-500": "red",
  "bg-blue-500": "blue",
  "bg-green-500": "green",
  "bg-yellow-500": "yellow",
  "bg-purple-500": "purple",
  "bg-pink-500": "pink",
  "bg-indigo-500": "indigo",
  "bg-orange-500": "orange",
  "bg-teal-500": "teal",
  "bg-cyan-500": "cyan",
};

export const colors = [
  { id: 1, label: "Red", value: "bg-red-500" },
  { id: 2, label: "Blue", value: "bg-blue-500" },
  { id: 3, label: "Green", value: "bg-green-500" },
  { id: 4, label: "Yellow", value: "bg-yellow-500" },
  { id: 5, label: "Purple", value: "bg-purple-500" },
  { id: 6, label: "Pink", value: "bg-pink-500" },
  { id: 7, label: "Indigo", value: "bg-indigo-500" },
  { id: 8, label: "Orange", value: "bg-orange-500" },
  { id: 9, label: "Teal", value: "bg-teal-500" },
  { id: 10, label: "Cyan", value: "bg-cyan-500" },
];

export const diceMap = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

const iconArray = [37, 103, 123, 189];

export const setIcon = (path, player1, player2, player3, player4) => {
  if (iconArray.includes(path)) return <FaRegStar size={22} />;
  if (path === 120) return <FaArrowLeft color={colorsMap[player3?.color]} />;
  if (path === 8) return <FaArrowDown color={colorsMap[player2?.color]} />;
  if (path === 106) return <FaArrowRight color={colorsMap[player1?.color]} />;
  if (path === 218) return <FaArrowUp color={colorsMap[player4?.color]} />;
  return null;
};

export const setBorderAndColor = (path, players) => {
  const player1 = players?.find((p) => p.status === "player-1");
  const player2 = players?.find((p) => p.status === "player-2");
  const player3 = players?.find((p) => p.status === "player-3");
  const player4 = players?.find((p) => p.status === "player-4");

  const borderClass = mergedBorderArray.includes(path)
    ? "border border-black"
    : "";

  if (player1?.homeArea?.includes(path)) {
    return `${player1.color} ${borderClass} h-7 w-7`;
  }

  if (player2?.homeArea?.includes(path)) {
    return `${player2.color} ${borderClass} h-7 w-7`;
  }

  if (player3?.homeArea?.includes(path)) {
    return `${player3.color} ${borderClass} h-7 w-7`;
  }

  if (player4?.homeArea?.includes(path)) {
    return `${player4.color} ${borderClass} h-7 w-7`;
  }

  if (mergedBorderArray.includes(path)) {
    return "border border-black h-7 w-7";
  }

  if (path === 112) {
    return "h-7 w-7 rotate-90 z-10";
  }

  if (path === 114) {
    return "h-7 w-7 -rotate-90 z-10";
  }

  if (path === 98) {
    return "h-7 w-7 rotate-180 z-10";
  }

  return "h-7 w-7 z-10";
};

export const setActiveHomePulse = (path, players, activePlayer) => {
  const activePlayerData = players?.find(
    (player) => player.status === activePlayer,
  );

  const isHomeCell = activePlayerData?.homeArea?.includes(path);
  const isExcluded = borderArray3.includes(path);

  return isHomeCell && !isExcluded
    ? "animate-[pulse_0.5s_infinite] transition-all duration-300"
    : "";
};
