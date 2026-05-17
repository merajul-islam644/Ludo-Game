import {
  defaultPlayers,
  defaultValues,
  endZone,
  pathOfPlayer1,
  pathOfPlayer2,
  pathOfPlayer3,
  pathOfPlayer4,
  PLAYER_CONFIG,
  safeZone,
} from "@/constant/constant";
import { createContext, useCallback, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext();

export const GameContext = ({ children }) => {
  const [modalType, setModalType] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const [isRoled, setIsRoled] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(
    () => JSON.parse(localStorage.getItem("currentPlayer")) || 0,
  );

  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem("players");
    return saved ? JSON.parse(saved) : defaultPlayers;
  });

  const player1 = players?.find((p) => p.status === "player-1");
  const player2 = players?.find((p) => p.status === "player-2");
  const player3 = players?.find((p) => p.status === "player-3");
  const player4 = players?.find((p) => p.status === "player-4");

  const playersArray = [
    player1?.status,
    player2?.status,
    player3?.status,
    player4?.status,
  ];

  const activePlayer = playersArray[currentPlayer];

  const nextTurn = useCallback(() => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  }, [players.length]);

  const winningStatus = players
    .find((player) => player.status === activePlayer)
    .piece.every((p) => endZone.includes(p.currentPosition));

  const checkingPathLength = players
    .find((player) => player.status === activePlayer)
    ?.piece.map((p) => p.stepsMoved);

  useEffect(() => {
    function name() {
      if (winningStatus) {
        nextTurn();
      }
    }
    name();
  }, [winningStatus, nextTurn]);

  useEffect(() => {
    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
  }, [currentPlayer]);

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

  const sendPieceBackOnPath = (playerStatus, pieceId, startSteps) => {
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

  const handleIncreacseStep = (playerStatus, id, nextTurn) => {
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
              if (piece.stepsMoved + diceValue >= player.path.length) {
                return piece;
              }

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
                  sendPieceBackOnPath(
                    player.status,
                    piece.id,
                    piece.stepsMoved,
                  );
                }

                return piece;
              }),
            };
          });
        });

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
        player1,
        player2,
        player3,
        player4,
        activePlayer,
        nextTurn,
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
