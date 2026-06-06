import { endZone } from "@/constant/boardPaths.constants";
import { defaultPlayers } from "@/constant/player.constants";
import { useInitializePlayers } from "@/hooks/useInitializePlayers";
import { initialModalState, modalReducer } from "@/reducers/modalReducer";
import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(modalReducer, initialModalState);
  const [diceValue, setDiceValue] = useState(1);
  const [isRoled, setIsRoled] = useState(false);
  const [moving, setMoving] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState(4);
  const [selectedPieces, setSelectedPieces] = useState(4);

  const [currentPlayer, setCurrentPlayer] = useState(
    () => JSON.parse(localStorage.getItem("currentPlayer")) || 0,
  );

  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem("players");
    return saved ? JSON.parse(saved) : defaultPlayers;
  });

  const { createPlayers } = useInitializePlayers(
    setPlayers,
    selectedPieces,
    selectedPlayers,
  );

  const player1 = players?.find((p) => p.status === "player-1");
  const player2 = players?.find((p) => p.status === "player-2");
  const player3 = players?.find((p) => p.status === "player-3");
  const player4 = players?.find((p) => p.status === "player-4");

  const playersArray = [player1?.id, player2?.id, player3?.id, player4?.id];

  const activePlayer = playersArray[currentPlayer];

  console.log(players);

  const nextTurn = useCallback(() => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  }, [players.length]);

  const winningStatus = players
    ?.find((player) => player?.status === activePlayer)
    ?.piece?.every((p) => endZone.includes(p?.currentPosition));

  const handleWin = useCallback(() => {
    // calculate rank from existing finished players
    const nextRank = players.filter((p) => p.winningStatus).length + 1;

    setPlayers((prev) =>
      prev.map((player) =>
        player.status === activePlayer
          ? { ...player, winningStatus: nextRank }
          : player,
      ),
    );

    nextTurn();
  }, [players, activePlayer, nextTurn]);

  useEffect(() => {
    if (!winningStatus) return;

    const player = players.find((p) => p.status === activePlayer);

    if (player?.winningStatus) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleWin();
  }, [winningStatus, activePlayer, players, handleWin]);

  useEffect(() => {
    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
  }, [currentPlayer]);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const savePlayers = () => {
    createPlayers();
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <gameContext.Provider
      value={{
        activeModal: modalState.activeModal,
        dispatch,
        savePlayers,
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
        moving,
        setMoving,
        setSelectedPlayers,
        setSelectedPieces,
        winningStatus,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export default GameContextProvider;
