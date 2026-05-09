import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaStarOfDavid,
} from "react-icons/fa";

export const path = Array.from({ length: 225 }, (_, i) => i + 1);

export const borderArray1 = [
  106, 107, 108, 109, 110, 111, 115, 116, 117, 118, 119, 120, 91, 92, 93, 94,
  95, 96, 100, 101, 102, 103, 104, 105, 121, 122, 123, 124, 125, 126, 130, 131,
  132, 133, 134, 135,
];

export const borderArray2 = [
  7, 8, 9, 22, 23, 24, 37, 38, 39, 52, 53, 54, 67, 68, 69, 82, 83, 84, 142, 143,
  144, 157, 158, 159, 172, 173, 174, 187, 188, 189, 202, 203, 204, 217, 218,
  219,
];

export const mergedBorderArray = [...borderArray1, ...borderArray2];

export const homeAreaPlayer1 = [
  1, 2, 3, 4, 5, 6, 16, 21, 31, 36, 46, 51, 61, 66, 76, 77, 78, 79, 80, 81, 92,
  107, 108, 109, 110, 111,
];

export const homeAreaPlayer2 = [
  10, 11, 12, 13, 14, 15, 25, 30, 40, 45, 55, 60, 70, 75, 85, 86, 87, 88, 89,
  90, 23, 24, 38, 53, 68, 83,
];

export const homeAreaPlayer3 = [
  115, 116, 117, 118, 119, 134, 145, 146, 147, 148, 149, 150, 160, 165, 175,
  180, 190, 195, 205, 210, 220, 221, 222, 223, 224, 225,
];

export const homeAreaPlayer4 = [
  136, 137, 138, 139, 140, 141, 143, 158, 173, 188, 151, 156, 166, 171, 181,
  186, 196, 201, 202, 203, 211, 212, 213, 214, 215, 216,
];

export const pieceOfHome1 = [62, 20, 17, 65, 32, 35, 47, 50];
export const pieceOfHome2 = [26, 74, 29, 71, 41, 44, 56, 59];
export const pieceOfHome3 = [164, 206, 161, 209, 176, 179, 191, 194];
export const pieceOfHome4 = [152, 200, 155, 197, 167, 170, 182, 185];

export const pathOfPlayer1 = [
  92, 93, 94, 95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101,
  102, 103, 104, 105, 120, 135, 134, 133, 132, 131, 130, 144, 159, 174, 189,
  204, 219, 218, 217, 202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121,
  106, 107, 108, 109, 110, 111,
];
export const pathOfPlayer2 = [
  24, 39, 54, 69, 84, 100, 101, 102, 103, 104, 105, 120, 135, 134, 133, 132,
  131, 130, 144, 159, 174, 189, 204, 219, 218, 217, 202, 187, 172, 157, 142,
  126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94, 95, 96, 82, 67, 52, 37, 22,
  7, 8, 23, 38, 53, 68, 83,
];
export const pathOfPlayer3 = [
  134, 133, 132, 131, 130, 144, 159, 174, 189, 204, 219, 218, 217, 202, 187,
  172, 157, 142, 126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94, 95, 96, 82,
  67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101, 102, 103, 104, 105,
  120, 119, 118, 117, 116, 115,
];
export const pathOfPlayer4 = [
  202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94,
  95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101, 102, 103,
  104, 105, 120, 135, 134, 133, 132, 131, 130, 144, 159, 174, 189, 204, 219,
  218, 203, 188, 173, 158, 143,
];

export const endZone = [97, 98, 99, 112, 113, 114, 127, 128, 129];

export const safeZone = [24, 92, 134, 202];

export const setBorderAndColor = (path, players) => {
  const player1 = players?.find((p) => p.status === "player-1");
  const player2 = players?.find((p) => p.status === "player-2");
  const player3 = players?.find((p) => p.status === "player-3");
  const player4 = players?.find((p) => p.status === "player-4");

  if (player1?.homeArea?.includes(path)) {
    return `${player1.color} h-7 w-7`;
  }

  if (player2?.homeArea?.includes(path)) {
    return `${player2.color} h-7 w-7`;
  }

  if (player3?.homeArea?.includes(path)) {
    return `${player3.color} h-7 w-7`;
  }

  if (player4?.homeArea?.includes(path)) {
    return `${player4.color} h-7 w-7`;
  }

  if (mergedBorderArray?.includes(path)) {
    return "border h-7 w-7";
  }

  return "";
};

const iconArray = [37, 103, 123, 189];

export const setIcon = (path) => {
  if (iconArray.includes(path)) return <FaStarOfDavid />;
  if (path === 8) return <FaArrowDown />;
  if (path === 120) return <FaArrowLeft />;
  if (path === 106) return <FaArrowRight />;
  if (path === 218) return <FaArrowUp />;
  return null;
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

/* ---------------- PLAYER CONFIG ---------------- */
export const PLAYER_CONFIG = {
  1: {
    color: "",
    homeArea: homeAreaPlayer1,
    piecePositions: pieceOfHome1,
    path: pathOfPlayer1,
    startPosition: 16,
  },
  2: {
    color: "",
    homeArea: homeAreaPlayer2,
    piecePositions: pieceOfHome2,
    path: pathOfPlayer2,
    startPosition: 25,
  },
  3: {
    color: "",
    homeArea: homeAreaPlayer3,
    piecePositions: pieceOfHome3,
    path: pathOfPlayer3,
    startPosition: 134,
  },
  4: {
    color: "",
    homeArea: homeAreaPlayer4,
    piecePositions: pieceOfHome4,
    path: pathOfPlayer4,
    startPosition: 202,
  },
};

/* ---------------- DEFAULT PLAYER ---------------- */
export const defaultValues = {
  id: 0,
  status: "",
  color: "",
  piece: [],
  homeArea: [],
  path: [],
};
