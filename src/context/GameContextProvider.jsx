// import { useCallback, useEffect, useReducer, useState } from "react";
// import { createContext } from "react";
// import { initialModalState, modalReducer } from "@/reducers/modalReducer";
// import {
//   colorClasses,
//   homeObject,
//   pathObject,
//   pieceStartPositionArray,
// } from "@/constants/constants";

// // eslint-disable-next-line react-refresh/only-export-components
// export const gameContext = createContext();

// const GameContextProvider = ({ children }) => {
//   const [modalState, dispatch] = useReducer(modalReducer, initialModalState);

//   const [selectedPlayers, setSelectedPlayers] = useState(4);
//   const [selectedPieces, setSelectedPieces] = useState(4);
//   const [movingPieceOrPlayerId, setMovingPiecerOPlayerId] = useState({
//     pieceId: null,
//     playerId: null,
//   });

//   const [currentPlayerId, setCurrentPlayerId] = useState(
//     () => JSON.parse(localStorage.getItem("currentPlayer")) || 1,
//   );
//   const [diceValue, setDiceValue] = useState(1);
//   const [hasRoled, setHasRoled] = useState(false);
//   const [players, setPlayers] = useState(
//     () => JSON.parse(localStorage.getItem("players")) || [],
//   );

//   // Create Pieces
//   const createPieces = useCallback(() => {
//     const pieces = [];
//     for (let i = 0; i < selectedPieces; i++) {
//       pieces.push({
//         id: i + 1,
//         isHome: true,
//         currentPosition: 0,
//         stepsMoved: 0,
//       });
//     }
//     return pieces;
//   }, [selectedPieces]);

//   // Create Players
//   const createPlayers = useCallback(() => {
//     const players = [];
//     for (let i = 0; i < selectedPlayers; i++) {
//       players.push({
//         id: i + 1,
//         status: `Player-${i + 1}`,
//         color:
//           selectedPlayers === 2 && i === 1
//             ? colorClasses[i + 2]
//             : colorClasses[i + 1],
//         pieces: createPieces(pieceStartPositionArray[i]),
//         homeArea:
//           selectedPlayers === 2 && i === 1
//             ? homeObject[i + 2]
//             : homeObject[i + 1],
//         path:
//           selectedPlayers === 2 && i === 1
//             ? pathObject[i + 2]
//             : pathObject[i + 1],
//       });
//     }
//     setPlayers(players);
//   }, [selectedPlayers, createPieces, setPlayers]);

//   // Players Persisting In The Local Storage
//   useEffect(() => {
//     localStorage.setItem("players", JSON.stringify(players));
//   }, [players]);

//   const nextTurn = useCallback(() => {
//     const currentIndex = players.findIndex((p) => p.id === currentPlayerId);
//     const nextIndex = (currentIndex + 1) % players.length;
//     setCurrentPlayerId(players[nextIndex]?.id);
//   }, [currentPlayerId, players]);

//   useEffect(() => {
//     if (currentPlayerId === undefined) return 1;
//     localStorage.setItem("currentPlayer", JSON.stringify(currentPlayerId));
//   }, [currentPlayerId]);

//   useEffect(() => {
//     // Next Turn while All Pieces Is Inside Of Home And DiceValue Is Less Than Six.
//     const collectionOfPieces = players
//       .map((player) => (player.id === currentPlayerId ? player.pieces : []))
//       .flat();

//     const checkingIfAllThePieceIsHome = collectionOfPieces.every(
//       (piece) => piece.isHome,
//     );

//     const noAvailableMoves = collectionOfPieces.every(
//       (piece) =>
//         !piece.isHome && hasRoled && piece.stepsMoved + diceValue >= 57,
//     );

//     if (
//       (checkingIfAllThePieceIsHome && hasRoled && diceValue < 6) ||
//       noAvailableMoves
//     ) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       nextTurn();
//       setHasRoled(false);
//     }

//     // Next turn if player has no unfinished pieces and all pieces are finished, and dice condition allows moving to next player
//     const currentPlayer = players.find(
//       (player) => player.id === currentPlayerId,
//     );

//     const finishedPieces = currentPlayer?.pieces.filter(
//       (piece) => piece.stepsMoved === 56,
//     );

//     const allPiecesFinished = finishedPieces?.every(
//       (piece) => piece.stepsMoved === 56,
//     );

//     const hasUnfinishedPieces = currentPlayer?.pieces.some(
//       (piece) => !piece.isHome && piece.stepsMoved !== 56,
//     );

//     if (
//       allPiecesFinished &&
//       !hasUnfinishedPieces &&
//       hasRoled &&
//       diceValue < 6
//     ) {
//       nextTurn();
//       setHasRoled(false);
//     }

//     // const noAvailablePath = currentPlayer.pieces
//     //   .filter((p) => !p.isHome)
//     //   .every((p) => p.stepsMoved + diceValue > 56);

//     // if (noAvailablePath && hasRoled && diceValue < 6) {
//     //   nextTurn();
//     //   setHasRoled(false);
//     // }

//     // Next Turn While All Piece Is Inside Of EndZone
//     const allAtEnd = currentPlayer
//       ? currentPlayer.pieces.every(
//           (piece) =>
//             piece.currentPosition ===
//             currentPlayer.path[currentPlayer.path.length - 1],
//         )
//       : false;

//     if (!hasRoled && allAtEnd) {
//       nextTurn();
//     }

//     // Setting Winning Status
//     const hasWon = players
//       .find((player) => player.id === currentPlayerId)
//       ?.pieces.every((piece) => piece.stepsMoved === 56);

//     // If won, update winning status
//     if (hasWon) {
//       setPlayers((prevPlayers) =>
//         prevPlayers.map((player) =>
//           player.id === currentPlayerId
//             ? { ...player, winningStatus: "Champion" }
//             : player,
//         ),
//       );
//     }
//   }, [currentPlayerId, players, nextTurn, diceValue, hasRoled]);

//   return (
//     <div>
//       <gameContext.Provider
//         value={{
//           activeModal: modalState.activeModal,
//           dispatch,
//           selectedPlayers,
//           setSelectedPlayers,
//           selectedPieces,
//           setSelectedPieces,
//           currentPlayerId,
//           diceValue,
//           hasRoled,
//           setHasRoled,
//           setDiceValue,
//           players,
//           setPlayers,
//           nextTurn,
//           movingPieceOrPlayerId,
//           setMovingPiecerOPlayerId,
//           createPlayers,
//         }}
//       >
//         {children}
//       </gameContext.Provider>
//     </div>
//   );
// };

// export default GameContextProvider;

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

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(modalReducer, initialModalState);

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
  const [isHydrating, setIsHydrating] = useState(true);

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
  // FIREBASE LISTENER - PLAYERS
  // -----------------------------
  useEffect(() => {
    const playersRef = ref(database, "players");

    const unsubPlayers = onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPlayers(data);
      }
      setIsHydrating(false);
    });

    return () => unsubPlayers();
  }, []);

  // -----------------------------
  // FIREBASE LISTENER - CURRENT PLAYER
  // -----------------------------
  useEffect(() => {
    const currentPlayerRef = ref(database, "currentPlayer");

    const unsubCurrent = onValue(currentPlayerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentPlayerId(data);
      }
    });

    return () => unsubCurrent();
  }, []);

  // -----------------------------
  // FIREBASE LISTENER - DICEVALUE
  // -----------------------------
  useEffect(() => {
    const diceRef = ref(database, "diceValue");

    const unsubDice = onValue(diceRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setDiceValue(data);
      }
    });

    return () => unsubDice();
  }, []);

  // -----------------------------
  // SYNC PLAYERS → FIREBASE
  // -----------------------------
  useEffect(() => {
    if (isHydrating) return;
    set(ref(database, "players"), players);
  }, [players, isHydrating]);

  // -----------------------------
  // SYNC CURRENT PLAYER → FIREBASE
  // -----------------------------
  useEffect(() => {
    if (isHydrating) return;
    set(ref(database, "currentPlayer"), currentPlayerId);
  }, [currentPlayerId, isHydrating]);

  // -----------------------------
  // LATEST PLAYERS REF
  // -----------------------------
  useEffect(() => {
    playersRefLatest.current = players;
  }, [players]);

  // -----------------------------
  // SYNC CURRENT PLAYERS DICEVALUE → FIREBASE
  // -----------------------------
  useEffect(() => {
    set(ref(database, "diceValue"), diceValue);
  }, [diceValue]);

  // -----------------------------
  // NEXT TURN (FIXED)
  // -----------------------------
  const nextTurn = useCallback(() => {
    setCurrentPlayerId((prevId) => {
      const players = playersRefLatest.current;

      if (!players || players.length === 0) return prevId;

      const currentIndex = players.findIndex((p) => p.id === prevId);

      if (currentIndex === -1) return players[0]?.id;

      const nextIndex = (currentIndex + 1) % players.length;

      return players[nextIndex]?.id ?? prevId;
    });
  }, []);

  // -----------------------------
  // GAME LOGIC (FIXED CONDITION ONLY)
  // -----------------------------
  useEffect(() => {
    if (!players.length) return;

    const currentPlayer = players.find(
      (player) => player.id === currentPlayerId,
    );

    const collectionOfPieces = players
      .map((player) => (player.id === currentPlayerId ? player.pieces : []))
      .flat();

    // const checkingIfAllThePieceIsHome = collectionOfPieces.every(
    //   (piece) => piece.isHome,
    // );

    const noAvailableMoves = collectionOfPieces.every(
      (piece) =>
        !piece.isHome && hasRoled && piece.stepsMoved + diceValue >= 57,
    );

    if (noAvailableMoves) {
      nextTurn();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasRoled(false);
    }

    const finishedPieces = currentPlayer?.pieces.filter(
      (piece) => piece.stepsMoved === 56,
    );

    const allPiecesFinished = finishedPieces?.every(
      (piece) => piece.stepsMoved === 56,
    );

    const hasUnfinishedPieces = currentPlayer?.pieces.some(
      (piece) => !piece.isHome && piece.stepsMoved !== 56,
    );

    if (
      allPiecesFinished &&
      !hasUnfinishedPieces &&
      hasRoled &&
      diceValue < 6
    ) {
      nextTurn();
      setHasRoled(false);
    }

    const allAtEnd = currentPlayer
      ? currentPlayer.pieces.every(
          (piece) =>
            piece.currentPosition ===
            currentPlayer.path[currentPlayer.path.length - 1],
        )
      : false;

    if (!hasRoled && allAtEnd) {
      nextTurn();
    }

    const hasWon = players
      .find((player) => player.id === currentPlayerId)
      ?.pieces.every((piece) => piece.stepsMoved === 56);

    if (hasWon) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === currentPlayerId
            ? { ...player, winningStatus: "Champion" }
            : player,
        ),
      );
    }
  }, [currentPlayerId, players, nextTurn, diceValue, hasRoled]);

  // -----------------------------
  // CONTEXT VALUE
  // -----------------------------
  return (
    <div>
      <gameContext.Provider
        value={{
          activeModal: modalState.activeModal,
          dispatch,

          selectedPlayers,
          setSelectedPlayers,

          selectedPieces,
          setSelectedPieces,

          currentPlayerId,
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
    </div>
  );
};

export default GameContextProvider;
