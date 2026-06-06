import { destination, safeZone } from "@/constant/boardPaths.constants";

export const shouldGrantExtraTurn = (
  finalPosition,
  players,
  diceValue,
  nextTurn,
) => {
  const isSafeZone = safeZone.includes(finalPosition);

  const captureOccurred =
    !isSafeZone &&
    players.some((player) =>
      player.piece.some(
        (p) =>
          p.currentPosition === finalPosition ||
          destination.includes(finalPosition),
      ),
    );

  const grantExtraTurn = diceValue === 6 || captureOccurred;

  if (!grantExtraTurn) {
    nextTurn();
  }
};
