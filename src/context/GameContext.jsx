import { endZone } from "@/constant/boardPaths.constants";
import { defaultPlayers } from "@/constant/player.constants";
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
    ?.find((player) => player?.status === activePlayer)
    ?.piece?.every((p) => endZone.includes(p?.currentPosition));

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
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export default GameContextProvider;
