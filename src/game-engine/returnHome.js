export const returnPieceToHome = (
  playerStatus,
  pieceId,
  startSteps,
  setPlayers,
) => {
  let steps = startSteps;

  const interval = setInterval(() => {
    if (steps <= 0) {
      clearInterval(interval);

      // FINAL SNAP TO HOME (safe state)
      setPlayers((prev) =>
        prev.map((player) => {
          if (player.status !== playerStatus) return player;

          return {
            ...player,
            piece: player.piece.map((piece) =>
              piece.id === pieceId
                ? {
                    ...piece,
                    stepsMoved: 0,
                    currentPosition: null,
                    isActive: false,
                    isHome: true,
                  }
                : piece,
            ),
          };
        }),
      );

      return;
    }

    setPlayers((prev) =>
      prev.map((player) => {
        if (player.status !== playerStatus) return player;

        return {
          ...player,
          piece: player.piece.map((piece) => {
            if (piece.id !== pieceId) return piece;

            const newSteps = steps - 1;

            return {
              ...piece,
              stepsMoved: newSteps,
              currentPosition: newSteps > 0 ? player.path[newSteps] : null,
              isActive: newSteps !== 0,
              isHome: newSteps === 0,
            };
          }),
        };
      }),
    );

    steps--;
  });
};
