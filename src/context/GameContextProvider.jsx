import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { createContext } from "react";
import { initialModalState, modalReducer } from "@/reducers/modalReducer";
import { colorClasses, homeObject, pathObject } from "@/constants/constants";
import {
  get,
  onDisconnect,
  onValue,
  ref,
  runTransaction,
  set,
} from "firebase/database";
import { database } from "@/firebase";

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = createContext();

const TURN_TIME_LIMIT = 20;

// Reading from localStorage keeps a refresh from dropping you onto a blank
// board: local games restore their last snapshot, online games reconnect to
// the same room and let the Firebase listeners re-hydrate from there.
const readStored = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const GameContextProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(modalReducer, initialModalState);

  const [selectedPlayers, setSelectedPlayers] = useState(() =>
    readStored("ludo:selectedPlayers", 4),
  );
  const [selectedPieces, setSelectedPieces] = useState(() =>
    readStored("ludo:selectedPieces", 4),
  );

  const [movingPieceOrPlayerId, setMovingPiecerOPlayerId] = useState({
    pieceId: null,
    playerId: null,
  });

  // "local" = pass-and-play on this device, no Firebase involved.
  // "online" = synced with other devices via Firebase (requires login).
  const [gameMode, setGameMode] = useState(() =>
    readStored("ludo:gameMode", "local"),
  );
  const isOnline = gameMode === "online";

  // Online games are scoped under rooms/{roomId} so different games never collide.
  const [roomId, setRoomId] = useState(() => readStored("ludo:roomId", null));
  const isRoomReady = isOnline && !!roomId;

  // Which player THIS device controls in the current online room (host claims
  // seat 1; everyone else claims an open seat before they can play). Local
  // pass-and-play ignores this entirely — any seat is fair game there.
  const [myPlayerId, setMyPlayerId] = useState(() =>
    readStored("ludo:myPlayerId", null),
  );
  const [claimedSeats, setClaimedSeats] = useState({});

  const [currentPlayerId, setCurrentPlayerId] = useState(() =>
    readStored("ludo:currentPlayerId", 1),
  );
  const [diceValue, setDiceValue] = useState(() =>
    readStored("ludo:diceValue", 1),
  );
  const [hasRoled, setHasRoled] = useState(false);
  const [players, setPlayers] = useState(() => readStored("ludo:players", []));

  const playersRefLatest = useRef(players);

  // Each online stream (players / currentPlayer / diceValue) hydrates from
  // Firebase independently and arrives in whatever order the network
  // delivers it. Writes must wait for ALL three first-snapshots — gating on
  // just one (e.g. players) let an early players snapshot flip hydration off
  // while currentPlayer was still the stale value restored from
  // localStorage, so that stale value got written back and clobbered the
  // room's real turn.
  const [playersLoaded, setPlayersLoaded] = useState(false);
  const [currentPlayerLoaded, setCurrentPlayerLoaded] = useState(false);
  const [diceLoaded, setDiceLoaded] = useState(false);
  const [hasRoledLoaded, setHasRoledLoaded] = useState(false);
  const isHydrating =
    isRoomReady &&
    !(playersLoaded && currentPlayerLoaded && diceLoaded && hasRoledLoaded);

  // Reset hydration synchronously (before effects run) whenever we enter a
  // room, so the "sync to Firebase" effects below never fire with stale
  // local state and clobber another player's already-written room data.
  const [prevRoomReady, setPrevRoomReady] = useState(isRoomReady);
  if (prevRoomReady !== isRoomReady) {
    setPrevRoomReady(isRoomReady);
    if (isRoomReady) {
      setPlayersLoaded(false);
      setCurrentPlayerLoaded(false);
      setDiceLoaded(false);
      setHasRoledLoaded(false);
    }
  }

  // -----------------------------
  // PERSIST MODE / ROOM (so a refresh reconnects instead of resetting)
  // -----------------------------
  useEffect(() => {
    localStorage.setItem("ludo:gameMode", JSON.stringify(gameMode));
  }, [gameMode]);

  useEffect(() => {
    localStorage.setItem("ludo:roomId", JSON.stringify(roomId));
  }, [roomId]);

  useEffect(() => {
    localStorage.setItem("ludo:myPlayerId", JSON.stringify(myPlayerId));
  }, [myPlayerId]);

  // -----------------------------
  // PERSIST LOCAL GAME STATE (online games rely on Firebase instead)
  // -----------------------------
  useEffect(() => {
    if (isOnline) return;
    localStorage.setItem("ludo:players", JSON.stringify(players));
  }, [players, isOnline]);

  useEffect(() => {
    if (isOnline) return;
    localStorage.setItem("ludo:currentPlayerId", JSON.stringify(currentPlayerId));
  }, [currentPlayerId, isOnline]);

  useEffect(() => {
    if (isOnline) return;
    localStorage.setItem("ludo:diceValue", JSON.stringify(diceValue));
  }, [diceValue, isOnline]);

  useEffect(() => {
    localStorage.setItem("ludo:selectedPlayers", JSON.stringify(selectedPlayers));
  }, [selectedPlayers]);

  useEffect(() => {
    localStorage.setItem("ludo:selectedPieces", JSON.stringify(selectedPieces));
  }, [selectedPieces]);

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
        pieces: createPieces(),
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
    // A fresh game always starts on player 1's turn — without this, a
    // currentPlayerId left over from a previous game (restored from
    // localStorage) can point at a player id that doesn't get to act first,
    // making it look like nobody can roll the dice.
    setCurrentPlayerId(players[0]?.id ?? 1);
    setDiceValue(1);
    setHasRoled(false);
  }, [selectedPlayers, createPieces]);

  // -----------------------------
  // FIREBASE LISTENER - PLAYERS (online mode only)
  // -----------------------------
  useEffect(() => {
    if (!isRoomReady) return;

    const playersRef = ref(database, `rooms/${roomId}/players`);

    const unsubPlayers = onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPlayers(data);
      }
      setPlayersLoaded(true);
    });

    return () => unsubPlayers();
  }, [isRoomReady, roomId]);

  // -----------------------------
  // FIREBASE LISTENER - CURRENT PLAYER (online mode only)
  // -----------------------------
  useEffect(() => {
    if (!isRoomReady) return;

    const currentPlayerRef = ref(database, `rooms/${roomId}/currentPlayer`);

    const unsubCurrent = onValue(currentPlayerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentPlayerId(data);
      }
      setCurrentPlayerLoaded(true);
    });

    return () => unsubCurrent();
  }, [isRoomReady, roomId]);

  // -----------------------------
  // FIREBASE LISTENER - DICEVALUE (online mode only)
  // -----------------------------
  useEffect(() => {
    if (!isRoomReady) return;

    const diceRef = ref(database, `rooms/${roomId}/diceValue`);

    const unsubDice = onValue(diceRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setDiceValue(data);
      }
      setDiceLoaded(true);
    });

    return () => unsubDice();
  }, [isRoomReady, roomId]);

  // -----------------------------
  // FIREBASE LISTENER - HASROLED (online mode only)
  // -----------------------------
  // hasRoled must be shared, not per-client local state — otherwise every
  // device has its own idea of whether the active player already rolled,
  // which the turn-timer (and the "does this player still have a move"
  // logic below) both depend on to stay consistent across clients.
  useEffect(() => {
    if (!isRoomReady) return;

    const hasRoledRef = ref(database, `rooms/${roomId}/hasRoled`);

    const unsubHasRoled = onValue(hasRoledRef, (snapshot) => {
      const data = snapshot.val();
      setHasRoled(data === true);
      setHasRoledLoaded(true);
    });

    return () => unsubHasRoled();
  }, [isRoomReady, roomId]);

  // -----------------------------
  // FIREBASE LISTENER - CLAIMED SEATS (online mode only)
  // -----------------------------
  useEffect(() => {
    if (!isRoomReady) return;

    const seatsRef = ref(database, `rooms/${roomId}/claimedSeats`);

    const unsubSeats = onValue(seatsRef, (snapshot) => {
      setClaimedSeats(snapshot.val() || {});
    });

    return () => unsubSeats();
  }, [isRoomReady, roomId]);

  // A refresh tears down the old connection (which fires that connection's
  // onDisconnect, removing our seat) and opens a new one. Nothing else
  // re-claims the seat afterwards, so without this, every refresh silently
  // drops you from claimedSeats — breaking both the "who's the authority"
  // calculation below and letting someone else steal your seat. Re-assert
  // ownership (and re-arm onDisconnect for the new connection) whenever we
  // already know which seat is ours.
  useEffect(() => {
    if (!isRoomReady || !myPlayerId) return;
    const seatRef = ref(database, `rooms/${roomId}/claimedSeats/${myPlayerId}`);
    set(seatRef, true);
    onDisconnect(seatRef).remove();
  }, [isRoomReady, roomId, myPlayerId]);

  // Whichever currently-claimed seat has the lowest id is the "authority"
  // device for turn-timer bookkeeping. Recomputing this from claimedSeats
  // (rather than hardcoding seat 1) means that if the host disconnects,
  // onDisconnect frees seat 1 and authority automatically shifts to whoever
  // has the next-lowest seat — no manual handoff needed.
  const authorityPlayerId = Object.keys(claimedSeats)
    .map(Number)
    .filter((id) => claimedSeats[id])
    .sort((a, b) => a - b)[0];
  const isAuthority = isOnline && myPlayerId === authorityPlayerId;

  // Atomically claims a seat so two devices can't end up controlling the
  // same player. Resolves true if this device now owns the seat. Takes the
  // room id explicitly since callers often invoke this right after
  // setRoomId(), before that state update has actually re-rendered.
  const claimSeat = useCallback(async (targetRoomId, playerId) => {
    if (!targetRoomId) return false;

    const seatRef = ref(
      database,
      `rooms/${targetRoomId}/claimedSeats/${playerId}`,
    );
    const result = await runTransaction(seatRef, (current) =>
      current ? undefined : true,
    );

    if (result.committed) {
      setMyPlayerId(playerId);
      // If this tab closes, crashes, or loses connection without ever
      // hitting Quit, Firebase itself frees the seat server-side — nobody
      // else has to notice or clean it up manually.
      onDisconnect(seatRef).remove();
    }

    return result.committed;
  }, []);

  const releaseSeat = useCallback(async () => {
    if (isRoomReady && myPlayerId) {
      const seatRef = ref(database, `rooms/${roomId}/claimedSeats/${myPlayerId}`);
      const seatsRef = ref(database, `rooms/${roomId}/claimedSeats`);
      await onDisconnect(seatRef).cancel();
      await set(seatRef, null);

      // Last one out closes the room, so abandoned games don't pile up in
      // the database forever.
      const remainingSeats = await get(seatsRef);
      const seats = remainingSeats.val();
      if (!seats || Object.keys(seats).length === 0) {
        set(ref(database, `rooms/${roomId}`), null);
      }
    }
    setMyPlayerId(null);
  }, [isRoomReady, roomId, myPlayerId]);

  // -----------------------------
  // SYNC PLAYERS → FIREBASE (online mode only)
  // -----------------------------
  useEffect(() => {
    if (!isRoomReady || isHydrating) return;
    set(ref(database, `rooms/${roomId}/players`), players);
  }, [players, isHydrating, isRoomReady, roomId]);

  // -----------------------------
  // SYNC CURRENT PLAYER → FIREBASE (online mode only)
  // -----------------------------
  useEffect(() => {
    if (!isRoomReady || isHydrating) return;
    set(ref(database, `rooms/${roomId}/currentPlayer`), currentPlayerId);
  }, [currentPlayerId, isHydrating, isRoomReady, roomId]);

  // -----------------------------
  // LATEST PLAYERS REF
  // -----------------------------
  useEffect(() => {
    playersRefLatest.current = players;
  }, [players]);

  // -----------------------------
  // SYNC CURRENT PLAYERS DICEVALUE → FIREBASE (online mode only)
  // -----------------------------
  useEffect(() => {
    if (!isRoomReady) return;
    set(ref(database, `rooms/${roomId}/diceValue`), diceValue);
  }, [diceValue, isRoomReady, roomId]);

  // -----------------------------
  // SYNC HASROLED → FIREBASE (online mode only)
  // -----------------------------
  useEffect(() => {
    if (!isRoomReady || isHydrating) return;
    set(ref(database, `rooms/${roomId}/hasRoled`), hasRoled);
  }, [hasRoled, isHydrating, isRoomReady, roomId]);

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
  // TURN TIMER — auto-skip a player who stalls, whether they never roll or
  // roll and then never move (online games only — local pass-and-play has
  // no clock)
  // -----------------------------
  // The deadline is a shared Firebase record ({playerId, phase, startedAt}),
  // not a per-client countdown: every device computes "seconds left" from
  // the same value, so different clients don't drift out of sync. "phase"
  // ("rolling" while waiting for the dice, "moving" once rolled and waiting
  // for a piece) means a bonus roll (rolling a 6) gets its own fresh
  // deadline instead of inheriting whatever was left of the roll phase, and
  // reconnecting never resets a deadline that already belongs to the same
  // (playerId, phase) pair.
  const [turnMeta, setTurnMeta] = useState(null);
  const [turnMetaLoaded, setTurnMetaLoaded] = useState(false);
  const [turnSecondsLeft, setTurnSecondsLeft] = useState(TURN_TIME_LIMIT);
  const turnPhase = hasRoled ? "moving" : "rolling";

  useEffect(() => {
    if (!isRoomReady) return;

    const turnRef = ref(database, `rooms/${roomId}/turn`);
    const unsubTurn = onValue(turnRef, (snapshot) => {
      setTurnMeta(snapshot.val() ?? null);
      setTurnMetaLoaded(true);
    });

    return () => unsubTurn();
  }, [isRoomReady, roomId]);

  // Only the authority writes, and only when the stored deadline doesn't
  // already belong to this exact (playerId, phase) — so reconnecting never
  // resets a countdown that's already running, but an actual phase change
  // (new turn, or roll-consumed-into-moving, or bonus-roll-back-to-rolling)
  // always gets a fresh window.
  useEffect(() => {
    if (
      !isRoomReady ||
      isHydrating ||
      !turnMetaLoaded ||
      !isAuthority ||
      (turnMeta?.playerId === currentPlayerId && turnMeta?.phase === turnPhase)
    ) {
      return;
    }
    set(ref(database, `rooms/${roomId}/turn`), {
      playerId: currentPlayerId,
      phase: turnPhase,
      startedAt: Date.now(),
    });
  }, [
    currentPlayerId,
    turnPhase,
    isRoomReady,
    isHydrating,
    turnMetaLoaded,
    isAuthority,
    turnMeta,
    roomId,
  ]);

  useEffect(() => {
    if (
      !isOnline ||
      !players.length ||
      !turnMeta ||
      turnMeta.playerId !== currentPlayerId ||
      turnMeta.phase !== turnPhase
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTurnSecondsLeft(TURN_TIME_LIMIT);
      return;
    }

    const tick = () => {
      const elapsed = Math.floor((Date.now() - turnMeta.startedAt) / 1000);
      setTurnSecondsLeft(Math.max(0, TURN_TIME_LIMIT - elapsed));
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isOnline, players.length, turnMeta, currentPlayerId, turnPhase]);

  useEffect(() => {
    if (!isOnline || turnSecondsLeft > 0 || !players.length || !isAuthority) {
      return;
    }
    // Whether they never rolled or rolled and never moved, the turn is
    // forfeited either way: pass to the next player and clear hasRoled so
    // the next player's roll-phase deadline starts clean.
    nextTurn();
    if (hasRoled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasRoled(false);
    }
  }, [turnSecondsLeft, players.length, isAuthority, isOnline, hasRoled, nextTurn]);

  // -----------------------------
  // WINNING STATUS — rank players in the order they finish all their pieces
  // -----------------------------
  // Winner.jsx reads player.winningStatus to show a 👑/🥇/🥈/🥉 badge, but
  // nothing was ever setting it — finishing the game never actually
  // produced a winner. This checks every piece directly (stepsMoved === 56)
  // rather than reusing the "allPiecesFinished" flag below, which is a
  // no-op check (Array.every on an already-filtered "finished pieces" array
  // is vacuously true) and doesn't account for a piece that never left home.
  useEffect(() => {
    if (!players.length) return;

    const finishOrder = ["Champion", "First", "Second", "Third"];
    const alreadyFinishedCount = players.filter((p) => p.winningStatus).length;
    if (alreadyFinishedCount >= finishOrder.length) return;

    const newlyFinished = players.find(
      (player) =>
        !player.winningStatus &&
        player.pieces.every((piece) => piece.stepsMoved === 56),
    );

    if (!newlyFinished) return;

    const rank = finishOrder[alreadyFinishedCount];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === newlyFinished.id ? { ...p, winningStatus: rank } : p,
      ),
    );
  }, [players]);

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

    const noAvailableMoves =
      hasRoled &&
      collectionOfPieces.every((piece) =>
        piece.isHome
          ? diceValue !== 6
          : piece.stepsMoved + diceValue >= 57,
      );

    // Every piece has reached the end of its path — including ones that
    // never left home (stepsMoved stays 0 for those, so they correctly
    // fail this check and the player isn't treated as finished early).
    // Replaces the old allPiecesFinished/hasUnfinishedPieces/allAtEnd trio:
    // allPiecesFinished ran .every() on an already-filtered "finished
    // pieces" array, so it was vacuously true even with 0 finished pieces,
    // and hasUnfinishedPieces only looked at pieces that had left home —
    // together they could treat a player as "finished" while a piece was
    // still sitting untouched at home.
    const playerHasFinished = currentPlayer
      ? currentPlayer.pieces.every((piece) => piece.stepsMoved === 56)
      : false;

    if (noAvailableMoves) {
      nextTurn();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasRoled(false);
    } else if (playerHasFinished && hasRoled && diceValue < 6) {
      nextTurn();
      setHasRoled(false);
    } else if (!hasRoled && playerHasFinished) {
      nextTurn();
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

          gameMode,
          setGameMode,

          roomId,
          setRoomId,
          isHydrating,

          myPlayerId,
          setMyPlayerId,
          claimedSeats,
          claimSeat,
          releaseSeat,

          selectedPlayers,
          setSelectedPlayers,

          selectedPieces,
          setSelectedPieces,

          currentPlayerId,
          diceValue,
          setDiceValue,

          hasRoled,
          setHasRoled,

          turnSecondsLeft,
          turnTimeLimit: TURN_TIME_LIMIT,

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
