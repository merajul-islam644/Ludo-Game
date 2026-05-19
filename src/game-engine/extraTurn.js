export const shouldGrantExtraTurn = (
  finalPosition,
  players,
  diceValue,
  nextTurn,
) => {
  const captureOccurred = players.some((player) =>
    player.piece.some((p) => p.currentPosition === finalPosition),
  );

  const grantExtraTurn = diceValue === 6 || captureOccurred;

  if (!grantExtraTurn) {
    nextTurn();
  }
};
