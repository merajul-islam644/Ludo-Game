import { useContext } from "react";
import { gameContext } from "@/context/GameContextProvider";
import { safeZone } from "@/constants/constants";

// Shared by Piece.jsx (end-zone/safe-zone pieces) and GridBoard.jsx (pieces
// on the main path) so the move/capture rules only live in one place.
export const useMovePiece = () => {
  const {
    players,
    diceValue,
    setPlayers,
    setHasRoled,
    nextTurn,
    setMovingPiecerOPlayerId,
  } = useContext(gameContext);

  const movePiece = (playerId, pieceId) => {
    setMovingPiecerOPlayerId({ pieceId, playerId });
    setHasRoled(false);

    const movingPlayer = players.find((p) => p.id === playerId);
    const movingPiece = movingPlayer.pieces.find((p) => p.id === pieceId);

    const finalPosition = movingPlayer.path[movingPiece.stepsMoved + diceValue];

    // Opponent positions don't change during the move animation, so this can
    // be decided once up front from the current snapshot.
    const capturesOpponent =
      !safeZone.includes(finalPosition) &&
      players.some(
        (player) =>
          player.id !== playerId &&
          player.pieces.some((piece) => piece.currentPosition === finalPosition),
      );

    let count = 0;

    const step = () => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.id !== playerId) return player;

          return {
            ...player,
            pieces: player.pieces.map((piece) => {
              if (piece.id !== pieceId) return piece;

              const newPosition = player.path[piece.stepsMoved + 1];

              return {
                ...piece,
                stepsMoved: piece.stepsMoved + 1,
                currentPosition: newPosition,
              };
            }),
          };
        }),
      );

      count++;

      if (count < diceValue) {
        setTimeout(step, 250);
        return;
      }

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.id === playerId) return player;

          return {
            ...player,
            pieces: player.pieces.map((piece) =>
              piece.currentPosition === finalPosition &&
              !safeZone.includes(finalPosition)
                ? {
                    ...piece,
                    currentPosition: 0,
                    isHome: true,
                    stepsMoved: 0,
                  }
                : piece,
            ),
          };
        }),
      );

      // Rolling a 6, or capturing an opponent's piece, earns another turn.
      if (diceValue < 6 && !capturesOpponent) {
        nextTurn();
      }
    };

    setTimeout(step, 250);
  };

  return movePiece;
};
