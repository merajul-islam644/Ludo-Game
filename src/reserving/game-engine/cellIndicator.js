export const getShowLoader = (players, activePlayer, allPath, diceValue) => {
  return players
    .find((player) => player.status === activePlayer)
    ?.piece?.some(
      (p) =>
        ((p.currentPosition === allPath || p.position === allPath) &&
          p.isHome &&
          diceValue === 6) ||
        (p.currentPosition === allPath && !p.isHome && diceValue === 6) ||
        (p.currentPosition === allPath && !p.isHome && diceValue < 6),
    );
};

export const getShowTile = (players, allPath) => {
  return players.some((player) =>
    player.piece?.some(
      (p) => p.currentPosition === allPath || p.position === allPath,
    ),
  );
};
