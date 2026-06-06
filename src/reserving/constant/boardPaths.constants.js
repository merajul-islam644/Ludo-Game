export const path = Array.from({ length: 225 }, (_, i) => i + 1);

export const destination = [98, 114, 112, 128];

export const safeZone = [24, 92, 134, 202];
export const endZone = [98, 112, 114, 128];

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

export const borderArray3 = [
  23, 24, 38, 53, 68, 83, 92, 107, 108, 109, 110, 111, 115, 116, 117, 118, 119,
  134, 143, 158, 173, 188, 202, 203,
];

export const mergedBorderArray = [
  ...borderArray1,
  ...borderArray2,
  ...borderArray3,
];
