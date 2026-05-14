import {
  defaultPlayers,
  defaultValues,
  PLAYER_CONFIG,
} from "@/constant/constant";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext();

export const GameContext = ({ children }) => {
  const [modalType, setModalType] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const [isRoled, setIsRoled] = useState(false);

  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem("players");
    return saved ? JSON.parse(saved) : defaultPlayers;
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const savePlayers = () => {
    localStorage.setItem("players", JSON.stringify(players));
    setIsOpenModal(false);
  };

  const handleSetPlayers = (value) => {
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

  const handleToggle = (playerStatus, id) => {
    setPlayers((prev) =>
      prev.map((player) => {
        if (player.status !== playerStatus) return player;

        return {
          ...player,
          piece: player.piece.map((piece) =>
            piece.id === id && diceValue === 6
              ? {
                  ...piece,
                  isHome: false,
                }
              : piece,
          ),
        };
      }),
    );
  };

  const handleIncreacseStep = (playerStatus, id, nextTurn) => {
    let count = 0;

    const interval = setInterval(() => {
      setPlayers((prev) => {
        let movedPosition = null;
        const updatedPlayers = prev.map((player) => {
          if (player.status !== playerStatus) return player;

          return {
            ...player,
            piece: player.piece.map((piece) => {
              if (piece.id !== id) return piece;

              const updatedSteps = piece.stepsMoved + 1;

              movedPosition = player.path[updatedSteps];

              return {
                ...piece,
                stepsMoved: updatedSteps,
                currentPosition: movedPosition,
              };
            }),
          };
        });

        return updatedPlayers.map((player) => {
          if (player.status === playerStatus) return player;

          return {
            ...player,
            piece: player.piece.map((piece) => {
              if (piece.currentPosition === movedPosition) {
                return {
                  ...piece,
                  isActive: false,
                  isHome: true,
                  stepsMoved: 0,
                  currentPosition: null,
                };
              }

              return piece;
            }),
          };
        });
      });

      count++;

      if (count >= diceValue) {
        clearInterval(interval);

        if (diceValue < 6) {
          nextTurn();
        }
      }
    }, 300);
    setIsRoled(false);
  };

  return (
    <gameContext.Provider
      value={{
        isOpenModal,
        setIsOpenModal,
        savePlayers,
        modalType,
        setModalType,
        diceValue,
        setDiceValue,
        isRoled,
        setIsRoled,
        players,
        setPlayers,
        handleSetPlayers,
        handleToggle,
        handleIncreacseStep,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export default GameContext;
