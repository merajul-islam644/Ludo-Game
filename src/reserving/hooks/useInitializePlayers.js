import { piecesPositionArray } from "@/constant/homeAreas.constants";
import { colorsArray, homeArray, pathArray } from "@/constant/player.constants";
import { useCallback } from "react";

export const useInitializePlayers = (
  setPlayers,
  selectedPieces,
  selectedPlayers,
) => {
  const createPieces = useCallback(
    (piecesPositions) => {
      const pieces = [];
      for (let i = 0; i < selectedPieces; i++) {
        const piece = {
          id: crypto.randomUUID(),
          position: piecesPositions[i],
          isActive: false,
          isHome: true,
          stepsMoved: 0,
          currentPosition: piecesPositions[i],
        };

        pieces.push(piece);
      }

      return pieces;
    },
    [selectedPieces],
  );

  const createPlayers = useCallback(() => {
    const players = [];
    for (let i = 0; i < selectedPlayers; i++) {
      const isSecondPlayerInTwoPlayerMode = selectedPlayers === 2 && i === 1;
      const playerIndex = isSecondPlayerInTwoPlayerMode ? i + 2 : i + 1;
      const pieceIndex = isSecondPlayerInTwoPlayerMode ? i + 1 : i;

      const player = {
        id: crypto.randomUUID(),
        status: `player-${playerIndex}`,
        color: colorsArray[playerIndex],
        winningStatus: "",
        piece: createPieces(piecesPositionArray[pieceIndex]),
        homeArea: homeArray[playerIndex],
        path: pathArray[playerIndex],
      };

      players.push(player);
    }

    setPlayers(players);
  }, [selectedPlayers, createPieces, setPlayers]);

  return { createPlayers };
};
