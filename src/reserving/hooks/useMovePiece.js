import { safeZone } from "@/constant/boardPaths.constants";
import { gameContext } from "@/context/GameContextProvider";
import { shouldGrantExtraTurn } from "@/game-engine/extraTurn";
import { returnPieceToHome } from "@/game-engine/returnHome";
import { useContext } from "react";

export const useMovePiece = () => {
  const { setPlayers, setIsRoled, diceValue, players, nextTurn, setMoving } =
    useContext(gameContext);

  const movePiece = (playerStatus, id) => {
    setMoving(true);
    let count = 0;
    let finalPosition = null;

    const interval = setInterval(() => {
      setPlayers((prev) => {
        return prev.map((player) => {
          if (
            player.status !== playerStatus ||
            player.stepsMoved + diceValue > player.path.length
          )
            return player;

          return {
            ...player,
            piece: player.piece.map((piece) => {
              if (piece.id !== id) return piece;

              const updatedSteps = piece.stepsMoved + 1;

              finalPosition = player.path[updatedSteps];

              return {
                ...piece,
                stepsMoved: updatedSteps,
                currentPosition: finalPosition,
              };
            }),
          };
        });
      });

      count++;

      if (count >= diceValue) {
        clearInterval(interval);

        setPlayers((prev) => {
          return prev.map((player) => {
            if (player.status === playerStatus) return player;

            return {
              ...player,
              piece: player.piece.map((piece) => {
                if (
                  piece.currentPosition === finalPosition &&
                  !safeZone.includes(finalPosition)
                ) {
                  returnPieceToHome(
                    player.status,
                    piece.id,
                    piece.stepsMoved,
                    setPlayers,
                  );
                }

                return piece;
              }),
            };
          });
        });

        if (diceValue < 6) {
          shouldGrantExtraTurn(finalPosition, players, diceValue, nextTurn);
        }
      }
    }, 300);

    setIsRoled(false);
  };

  return { movePiece };
};
