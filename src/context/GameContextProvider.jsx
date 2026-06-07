import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { createContext } from "react";
import { initialModalState, modalReducer } from "@/reducers/modalReducer";
import {
  colorClasses,
  homeObject,
  pathObject,
  pieceStartPositionArray,
} from "@/constants/constants";

import { onValue, ref, set } from "firebase/database";
import { database } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// -----------------------------
// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext();
// -----------------------------

const GameContextProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(modalReducer, initialModalState);

  const auth = getAuth();

  // ✅ FIX: stable UID state
  const [uid, setUid] = useState(null);

  const [selectedPlayers, setSelectedPlayers] = useState(4);
  const [selectedPieces, setSelectedPieces] = useState(4);

  const [movingPieceOrPlayerId, setMovingPiecerOPlayerId] = useState({
    pieceId: null,
    playerId: null,
  });

  const [currentPlayerId, setCurrentPlayerId] = useState(1);
  const [diceValue, setDiceValue] = useState(1);
  const [hasRoled, setHasRoled] = useState(false);
  const [players, setPlayers] = useState([]);

  const playersRefLatest = useRef(players);
  const isHydrating = useRef(true);
  const isRemoteUpdate = useRef(false);

  // -----------------------------
  // AUTH FIX
  // -----------------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid || null);
    });

    return () => unsub();
  }, [auth]);

  // -----------------------------
  // CREATE PIECES
  // -----------------------------
  const createPieces = useCallback(() => {
    const pieces = [];

    for (let i = 0; i < selectedPieces; i++) {
      pieces.push({
        id: i + 1,
        isHome: true,
        currentPosition: 0,
        stepsMoved: 0,
      });
    }

    return pieces;
  }, [selectedPieces]);

  // -----------------------------
  // CREATE PLAYERS
  // -----------------------------
  const createPlayers = useCallback(() => {
    const players = [];

    for (let i = 0; i < selectedPlayers; i++) {
      players.push({
        id: i + 1,
        status: `Player-${i + 1}`,
        color:
          selectedPlayers === 2 && i === 1
            ? colorClasses[i + 2]
            : colorClasses[i + 1],
        pieces: createPieces(pieceStartPositionArray[i]),
        homeArea:
          selectedPlayers === 2 && i === 1
            ? homeObject[i + 2]
            : homeObject[i + 1],
        path:
          selectedPlayers === 2 && i === 1
            ? pathObject[i + 2]
            : pathObject[i + 1],
      });
    }

    setPlayers(players);
  }, [selectedPlayers, createPieces]);

  // -----------------------------
  // FIREBASE: PLAYERS LISTENER
  // -----------------------------
  useEffect(() => {
    if (!uid) return;

    const playersRef = ref(database, `users/${uid}/players`);

    const unsub = onValue(playersRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        isRemoteUpdate.current = true;
        setPlayers(data);
      }

      isHydrating.current = false;
    });

    return () => unsub();
  }, [uid]);

  // -----------------------------
  // FIREBASE: CURRENT PLAYER
  // -----------------------------
  useEffect(() => {
    if (!uid) return;

    const currentRef = ref(database, `users/${uid}/currentPlayer`);

    const unsub = onValue(currentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setCurrentPlayerId(data);
    });

    return () => unsub();
  }, [uid]);

  // -----------------------------
  // FIREBASE: DICE
  // -----------------------------
  useEffect(() => {
    if (!uid) return;

    const diceRef = ref(database, `users/${uid}/diceValue`);

    const unsub = onValue(diceRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setDiceValue(data);
    });

    return () => unsub();
  }, [uid]);

  // -----------------------------
  // SYNC PLAYERS → FIREBASE
  // -----------------------------
  useEffect(() => {
    if (!uid) return;
    if (isHydrating.current) return;
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }

    set(ref(database, `users/${uid}/players`), players);
  }, [players, uid]);

  // -----------------------------
  // SYNC CURRENT PLAYER → FIREBASE (FIXED PATH)
  // -----------------------------
  useEffect(() => {
    if (!uid) return;
    if (isHydrating.current) return;

    set(ref(database, `users/${uid}/currentPlayer`), currentPlayerId);
  }, [currentPlayerId, uid]);

  // -----------------------------
  // SYNC DICE → FIREBASE
  // -----------------------------
  useEffect(() => {
    if (!uid) return;

    set(ref(database, `users/${uid}/diceValue`), diceValue);
  }, [diceValue, uid]);

  // -----------------------------
  // latest ref
  // -----------------------------
  useEffect(() => {
    playersRefLatest.current = players;
  }, [players]);

  // -----------------------------
  // NEXT TURN (SAFE)
  // -----------------------------
  const nextTurn = useCallback(() => {
    setCurrentPlayerId((prevId) => {
      const players = playersRefLatest.current;

      if (!players?.length) return prevId;

      const index = players.findIndex((p) => p.id === prevId);
      if (index === -1) return players[0]?.id;

      const nextIndex = (index + 1) % players.length;
      return players[nextIndex]?.id ?? prevId;
    });
  }, []);

  // -----------------------------
  // GAME LOGIC
  // -----------------------------
  useEffect(() => {
    if (!players.length) return;

    const currentPlayer = players.find((p) => p.id === currentPlayerId);

    const pieces = players
      .map((p) => (p.id === currentPlayerId ? p.pieces : []))
      .flat();

    const noAvailableMoves = pieces.every(
      (piece) =>
        !piece.isHome && hasRoled && piece.stepsMoved + diceValue >= 57,
    );

    if (noAvailableMoves) {
      nextTurn();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasRoled(false);
    }

    const allPiecesFinished = currentPlayer?.pieces.every(
      (p) => p.stepsMoved === 56,
    );

    const hasUnfinished = currentPlayer?.pieces.some(
      (p) => !p.isHome && p.stepsMoved !== 56,
    );

    if (allPiecesFinished && !hasUnfinished && hasRoled && diceValue < 6) {
      nextTurn();
      setHasRoled(false);
    }

    const allAtEnd = currentPlayer?.pieces.every(
      (p) =>
        p.currentPosition === currentPlayer.path[currentPlayer.path.length - 1],
    );

    if (!hasRoled && allAtEnd) {
      nextTurn();
    }
  }, [currentPlayerId, players, diceValue, hasRoled, nextTurn]);

  // -----------------------------
  // CONTEXT
  // -----------------------------
  return (
    <gameContext.Provider
      value={{
        activeModal: modalState.activeModal,
        dispatch,

        selectedPlayers,
        setSelectedPlayers,

        selectedPieces,
        setSelectedPieces,

        currentPlayerId,
        setCurrentPlayerId,

        diceValue,
        setDiceValue,

        hasRoled,
        setHasRoled,

        players,
        setPlayers,

        nextTurn,

        movingPieceOrPlayerId,
        setMovingPiecerOPlayerId,

        createPlayers,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export default GameContextProvider;
