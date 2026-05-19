import { defaultValues, PLAYER_CONFIG } from "@/constant/player.constants";
import { gameContext } from "@/context/GameContext";
import { useContext } from "react";

export const useInitializePlayers = () => {
  const { setPlayers } = useContext(gameContext);
  const initializePlayers = (value) => {
    const numberOfPlayers = Number(value);

    const PLAYER_ORDER_2 = [1, 3];
    const PLAYER_ORDER_4 = [1, 2, 3, 4];

    const order = numberOfPlayers === 2 ? PLAYER_ORDER_2 : PLAYER_ORDER_4;

    const newPlayers = order.map((playerIndex) => {
      const config = PLAYER_CONFIG[playerIndex];

      return {
        ...defaultValues,
        id: playerIndex,
        status: `player-${playerIndex}`,
        color: config.color,
        homeArea: config.homeArea,
        path: config.path,
      };
    });

    setPlayers(newPlayers);
  };

  return { initializePlayers };
};
