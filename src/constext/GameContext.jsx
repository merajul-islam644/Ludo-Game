import { defaultValues, PLAYER_CONFIG } from "@/constant/constant";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext();

export const GameContext = ({ children }) => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [shouldSave, setShouldSave] = useState(false);
  const [error, setError] = useState({
    playerSelectionError: "",
    pieceSelectionError: "",
    colorSelectionError: "",
  });
  const [diceValue, setDiceValue] = useState(1);
  const [players, setPlayers] = useState(
    () => JSON.parse(localStorage.getItem("players")) || [],
  );

  const resetError = () => {
    setError({
      playerSelectionError: "",
      pieceSelectionError: "",
      colorSelectionError: "",
    });
  };

  useEffect(() => {
    function name() {
      if (shouldSave) {
        localStorage.setItem("players", JSON.stringify(players));
        setIsOpenModal(false);
        resetError();
      }
      resetError();
    }
    name();
  }, [players, shouldSave]);

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
              ? { ...piece, isHome: false }
              : piece,
          ),
        };
      }),
    );
  };

  // const handleCancelPiece = (allPath) => {
  //   console.log(allPath);
  // };

  const handleIncreacseStep = (playerStatus, id, nextTurn) => {
    let count = 0;

    const interval = setInterval(() => {
      setShouldSave(true);
      setPlayers((prev) =>
        prev.map((player) => {
          if (player.status !== playerStatus) return player;

          return {
            ...player,
            piece: player.piece.map((piece) =>
              piece.id === id
                ? { ...piece, stepsMoved: piece.stepsMoved + 1 }
                : piece,
            ),
          };
        }),
      );

      count++;
      if (count >= diceValue) clearInterval(interval);
    }, 300);
    nextTurn();
  };

  const handleNavigateToLudoBoard = () => {
    if (players.length === 0) {
      setError((prev) => ({
        ...prev,
        playerSelectionError: "No player selected",
      }));
      return;
    }

    if (players.some((player) => player.piece.length === 0)) {
      setError((prev) => ({
        ...prev,
        pieceSelectionError: "No piece selected",
      }));
    }

    if (players.some((player) => player.color === "")) {
      setError((prev) => ({
        ...prev,
        colorSelectionError: "No color selected",
      }));
    } else {
      navigate("/ludoBoard");
    }
  };

  const handleColorSetModal = () => {
    const hasPlayers = players.length > 0;

    if (!hasPlayers) {
      setError((prev) => ({
        ...prev,
        colorSelectionError: "No players available",
      }));
      return;
    }
    setIsOpenModal(true);
  };

  return (
    <gameContext.Provider
      value={{
        isOpenModal,
        setIsOpenModal,
        setShouldSave,
        error,
        diceValue,
        setDiceValue,
        players,
        setPlayers,
        handleSetPlayers,
        handleToggle,
        // handleCancelPiece,
        handleIncreacseStep,
        handleNavigateToLudoBoard,
        handleColorSetModal,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export default GameContext;
