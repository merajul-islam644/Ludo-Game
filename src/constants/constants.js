// All Path
export const boardPath = Array.from({ length: 225 }, (_, i) => i + 1);

// Border
export const borderArea = [
  91, 92, 93, 94, 95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100,
  101, 102, 103, 104, 105, 120, 135, 130, 131, 132, 133, 134, 144, 159, 174,
  189, 204, 217, 218, 219, 202, 187, 172, 157, 142, 121, 122, 123, 124, 125,
  126, 106, 107, 108, 109, 110, 111, 115, 116, 117, 118, 119, 23, 38, 53, 68,
  83, 143, 158, 173, 188, 203,
];

// Home Area
export const homeAreaOne = [
  1, 2, 3, 4, 5, 6, 16, 21, 31, 36, 46, 51, 61, 66, 81, 76, 77, 78, 79, 80, 92,
  107, 108, 109, 110, 111,
];

export const homeAreaTwo = [
  10, 11, 12, 13, 14, 15, 23, 24, 25, 30, 38, 53, 68, 83, 40, 45, 55, 60, 70,
  75, 85, 86, 87, 88, 89, 90,
];

export const homeAreaThree = [
  145, 146, 147, 148, 149, 150, 160, 165, 175, 180, 190, 195, 205, 210, 220,
  221, 222, 223, 224, 225, 115, 116, 117, 118, 119, 134,
];

export const homeAreaFour = [
  136, 137, 138, 139, 140, 141, 143, 151, 156, 158, 171, 173, 166, 181, 186,
  188, 196, 201, 211, 212, 213, 214, 215, 216, 202, 203,
];

export const pulseHomeArea = [
  1, 2, 3, 4, 5, 6, 16, 21, 31, 36, 46, 51, 61, 66, 81, 76, 77, 78, 79, 80, 10,
  11, 12, 13, 14, 15, 25, 30, 40, 45, 55, 60, 70, 75, 85, 86, 87, 88, 89, 90,
  145, 146, 147, 148, 149, 150, 160, 165, 175, 180, 190, 195, 205, 210, 220,
  221, 222, 223, 224, 225, 136, 137, 138, 139, 140, 141, 151, 156, 171, 166,
  181, 186, 196, 201, 211, 212, 213, 214, 215, 216,
];

export const homeObject = {
  1: homeAreaOne,
  2: homeAreaTwo,
  3: homeAreaThree,
  4: homeAreaFour,
};

// Path Area
export const pathAreaOne = [
  92, 93, 94, 95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101,
  102, 103, 104, 105, 120, 135, 134, 133, 132, 131, 130, 144, 159, 174, 189,
  204, 219, 218, 217, 202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121,
  106, 107, 108, 109, 110, 111, 112,
];
export const pathAreaTwo = [
  24, 39, 54, 69, 84, 100, 101, 102, 103, 104, 105, 120, 135, 134, 133, 132,
  131, 130, 144, 159, 174, 189, 204, 219, 218, 217, 202, 187, 172, 157, 142,
  126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94, 95, 96, 82, 67, 52, 37, 22,
  7, 8, 23, 38, 53, 68, 83, 98,
];
export const pathAreaThree = [
  134, 133, 132, 131, 130, 144, 159, 174, 189, 204, 219, 218, 217, 202, 187,
  172, 157, 142, 126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94, 95, 96, 82,
  67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101, 102, 103, 104, 105,
  120, 119, 118, 117, 116, 115, 114,
];
export const pathAreaFour = [
  202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94,
  95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101, 102, 103,
  104, 105, 120, 135, 134, 133, 132, 131, 130, 144, 159, 174, 189, 204, 219,
  218, 203, 188, 173, 158, 143, 128,
];

export const pathObject = {
  1: pathAreaOne,
  2: pathAreaTwo,
  3: pathAreaThree,
  4: pathAreaFour,
};

export const pieceStartPositionOfPlayerOne = [62, 20, 17, 65, 32, 35, 47, 50];
export const pieceStartPositionOfPlayerTwo = [42, 43, 57, 58];
export const pieceStartPositionOfPlayerThree = [
  164, 206, 161, 209, 176, 179, 191, 194,
];

export const pieceStartPositionOfPlayerFour = [
  152, 200, 197, 155, 167, 170, 182, 185,
];

export const pieceStartPositionArray = [
  pieceStartPositionOfPlayerOne,
  pieceStartPositionOfPlayerTwo,
  pieceStartPositionOfPlayerThree,
  pieceStartPositionOfPlayerFour,
];

export const safeZone = [92, 24, 134, 202];
export const endZone = [98, 128, 112, 114];

// Colors
export const colorClasses = {
  1: "bg-red-500",
  2: "bg-green-500",
  3: "bg-yellow-500",
  4: "bg-cyan-500",
  5: "bg-purple-500",
  6: "bg-pink-500",
  7: "bg-orange-500",
  8: "bg-blue-500",
  9: "bg-lime-500",
  10: "bg-indigo-500",
};

export const piecePositionOfHome = [
  {
    position: "top-0 left-0",
    side: "left",
  },
  {
    position: "top-0 right-0",
    side: "right",
  },
  {
    position: "bottom-0 right-0",
    side: "right",
  },
  {
    position: "bottom-0 left-0",
    side: "left",
  },
];

export const endZoneTrainglePosition = [
  {
    className: "absolute inset-0",
    style: "polygon(50% 50%, 0% 100%, 0% 0%)",
  },
  {
    className: "absolute inset-0",
    style: "polygon(50% 50%, 0% 0%, 100% 0%)",
  },
  {
    className: "absolute inset-0",
    style: "polygon(50% 50%, 100% 0%, 100% 100%)",
  },
  {
    className: "absolute inset-0",
    style: "polygon(50% 50%, 100% 100%, 0% 100%)",
  },
];

export const activePlayersIndicatorsPosition = [
  { icon: "👈", position: "top-0 left-28" },
  { icon: "👉", position: "top-0 right-28" },
  { icon: "👉", position: "bottom-5 right-28" },
  { icon: "👈", position: "bottom-5 left-28" },
];

export const playersBasePosition = {
  1: "top-0 left-10",
  2: "top-0 right-10",
  3: "bottom-0 right-10",
  4: "bottom-0 left-10",
};

export const winnerIconsPosition = {
  1: "top-0 left-0",
  2: "top-0 right-0",
  3: "bottom-0 right-0",
  4: "bottom-0 left-0",
};

export const winnerStatus = {
  Champion: {
    icon: "👑",
  },
  First: {
    icon: "🥇",
  },
  Second: {
    icon: "🥈",
  },
  Third: {
    icon: "🥉",
  },
};

export const safeZonesPiecesPosition = [
  { position: "top-42 left-7", safeZoneNumber: 92 },
  { position: "top-7 right-42", safeZoneNumber: 24 },
  { position: "bottom-42 right-7", safeZoneNumber: 134 },
  { position: "bottom-7 left-42", safeZoneNumber: 202 },
];

export const endZonesPiecesPosition = [
  { position: "top-49 left-42.5", endZoneNumber: 112 },
  { position: "top-42.5 right-49", endZoneNumber: 98 },
  { position: "bottom-49 right-42.5", endZoneNumber: 114 },
  { position: "bottom-42.5 left-49", endZoneNumber: 128 },
];

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
