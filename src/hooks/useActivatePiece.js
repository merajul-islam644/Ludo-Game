import {
  pathOfPlayer1,
  pathOfPlayer2,
  pathOfPlayer3,
  pathOfPlayer4,
} from "@/constant/playerPaths.constants";
import { gameContext } from "@/context/GameContext";
import { useContext } from "react";

export const useActivatePiece = () => {
  const { setIsRoled, setPlayers, diceValue } = useContext(gameContext);
  const activatePiece = (playerStatus, id) => {
    setIsRoled(false);
    setPlayers((prev) =>
      prev.map((player) => {
        if (player.status !== playerStatus) return player;
        let startPosition = null;

        if (player.status === "player-1") {
          startPosition = pathOfPlayer1[0];
        } else if (player.status === "player-2") {
          startPosition = pathOfPlayer2[0];
        } else if (player.status === "player-3") {
          startPosition = pathOfPlayer3[0];
        } else if (player.status === "player-4") {
          startPosition = pathOfPlayer4[0];
        }

        return {
          ...player,
          piece: player.piece.map((piece) =>
            piece.id === id && diceValue === 6
              ? {
                  ...piece,
                  isHome: false,
                  stepsMoved: 0,
                  currentPosition: startPosition,
                }
              : piece,
          ),
        };
      }),
    );
  };
  return { activatePiece };
};
