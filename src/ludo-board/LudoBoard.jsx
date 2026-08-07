import {
  activePlayersIndicatorsPosition,
  colorClasses,
  endZonesPiecesPosition,
  piecePositionOfHome,
  playersBasePosition,
  safeZonesPiecesPosition,
} from "../constants/constants";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { gameContext } from "../context/GameContextProvider";
import DefaultHomeZone from "../default-home-zone/DefaultHomeZone";
import DiceBox from "../dice-box/DiceBox";
import ActivePlayersIndicator from "../active-players-indicator/ActivePlayersIndicator";
import GridBoard from "@/grid-board/GridBoard";
import HomeZone from "@/home-zone/HomeZone";
import EndZone from "@/end-zone/EndZone";
import PlayerBase from "@/player-base/PlayerBase";
import EndZonePiecesPositionComponent from "@/endZone-pieces-position-component/EndZonePiecesPositionComponent";
import SafeZonePiecesPositionComponent from "@/safezone-pieces-position-component/SafeZonePiecesPositionComponent";
import Winner from "@/winner/Winner";

const LudoBoard = () => {
  const {
    players,
    dispatch,
    gameMode,
    roomId,
    isHydrating,
    myPlayerId,
    claimedSeats,
    claimSeat,
    selectedPieces,
  } = useContext(gameContext);
  const [copied, setCopied] = useState(false);
  const [claiming, setClaiming] = useState(null);
  const navigate = useNavigate();

  const isOnline = gameMode === "online";
  const needsSeat = isOnline && !myPlayerId;

  // Slots (1-4) with no real player in them still need a decorative
  // placeholder in their home-area quadrant, otherwise it just looks empty
  // — previously this only handled exactly 2 players (hardcoded to slots
  // 2 & 4), so e.g. a 3-player game left slot 4's corner blank.
  const usedColors = new Set(players.map((p) => p.color));
  const unusedSlots = [1, 2, 3, 4].filter(
    (slot) => !usedColors.has(colorClasses[slot]),
  );
  const placeholderPieces = Array.from({ length: selectedPieces }, (_, i) => ({
    id: i + 1,
  }));

  // Safety net: if there's genuinely no game to show (e.g. a refresh wiped
  // in-memory state and there's nothing to restore), bounce back to the
  // dashboard instead of rendering an empty board.
  useEffect(() => {
    if (isHydrating) return;
    if (isOnline && !roomId) {
      navigate("/");
      return;
    }
    if (!players.length && !needsSeat) {
      navigate("/");
    }
  }, [players.length, isOnline, roomId, isHydrating, needsSeat, navigate]);

  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      toast.success("Room ID copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy room ID");
    }
  };

  const handleClaimSeat = async (playerId) => {
    setClaiming(playerId);
    const success = await claimSeat(roomId, playerId);
    setClaiming(null);
    if (!success) {
      toast.error("Someone already took that seat");
    }
  };

  // Joiner hasn't picked a player yet: wait for the host's player list to
  // sync in, then let them claim an open seat before showing the board.
  if (needsSeat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4 text-center">
          <h2 className="text-white text-lg font-bold">Choose your player</h2>

          {!players.length ? (
            <p className="text-gray-400 text-sm">
              Waiting for the host to set up the game…
            </p>
          ) : (
            <div className="space-y-2">
              {players.map((player) => {
                const taken = !!claimedSeats?.[player.id];
                return (
                  <Button
                    key={player.id}
                    disabled={taken || claiming === player.id}
                    onClick={() => handleClaimSeat(player.id)}
                    className="w-full h-11 rounded-xl font-semibold text-white bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {player.status} {taken ? "(taken)" : ""}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen bg-slate-700">
      <div className="flex justify-center items-center h-screen bg-black border-4 border-amber-400 px-1">
        <div className="relative py-16">
          {isOnline && roomId && myPlayerId === 1 && (
            <div className="absolute z-50 -top-16 left-42 -translate-x-full">
              <button
                onClick={handleCopyRoomId}
                title="Copy room ID to share"
                className="bg-cyan-500 px-2 pt-1 pb-0.5 rounded font-bold text-white text-xs tracking-wider cursor-pointer whitespace-nowrap"
              >
                {copied ? "COPIED!" : `ROOM: ${roomId}`}
              </button>
            </div>
          )}

          <div className="absolute z-50 left-44 -top-16">
            <button
              onClick={() =>
                dispatch({
                  type: "OPEN_MODAL",
                  payload: "QUIT",
                })
              }
              className="bg-red-500 px-1 pt-1 pb-0.5 rounded font-bold text-white"
            >
              QUIT
            </button>
          </div>

          <div className="flex justify-center items-center relative bg-white">
            <div>
              <GridBoard players={players} />
            </div>

            <div>
              {players.map((player) => {
                return (
                  <HomeZone
                    key={player.id}
                    position={
                      piecePositionOfHome[
                        players.length === 2 && player.id === 2
                          ? player.id
                          : player.id - 1
                      ]?.position
                    }
                    color={player.color}
                    pieces={player.pieces}
                    playerId={player.id}
                  />
                );
              })}
            </div>

            {unusedSlots.length > 0 && (
              <div>
                {unusedSlots.map((slot) => (
                  <DefaultHomeZone
                    key={slot}
                    color={colorClasses[slot]}
                    position={piecePositionOfHome[slot - 1]?.position}
                    pieces={placeholderPieces}
                  />
                ))}
              </div>
            )}

            <div className="absolute">
              <EndZone />
            </div>

            <div>
              {players.map((player) => (
                <Winner key={player.id} player={player} />
              ))}
            </div>

            <div>
              {players.map((player) => (
                <PlayerBase
                  key={player.id}
                  position={
                    playersBasePosition[
                      players.length === 2 && player.id === 2
                        ? player.id + 1
                        : player.id
                    ]
                  }
                  playerStatus={player.status}
                />
              ))}
            </div>

            {/*
              These represent fixed board squares, not player-owned slots —
              every player's path crosses all 4 safe zones and both end-zone
              entries as they travel around the shared board. Mapping over
              `players` (as before) only rendered as many watchers as there
              were players, so with fewer than 4 players some of these
              squares had no component watching them at all — GridBoard
              deliberately skips rendering pieces on safe/end squares
              (delegates to these), so a piece landing on an unwatched
              square (e.g. a 2-player game's unclaimed slot 3/4 squares)
              simply never appeared on screen. These always render all 4,
              regardless of player count.
            */}
            <div>
              {endZonesPiecesPosition.map((zone, index) => (
                <EndZonePiecesPositionComponent
                  key={index}
                  position={zone.position}
                  endZoneNumber={zone.endZoneNumber}
                />
              ))}
            </div>

            <div>
              {safeZonesPiecesPosition.map((zone, index) => (
                <SafeZonePiecesPositionComponent
                  key={index}
                  position={zone.position}
                  safeZoneNumber={zone.safeZoneNumber}
                />
              ))}
            </div>
          </div>

          <div>
            {players.map((player) => (
              <DiceBox
                key={player.id}
                player={player}
                position={
                  piecePositionOfHome[
                    players.length === 2 && player.id === 2
                      ? player.id
                      : player.id - 1
                  ]?.position
                }
                side={
                  piecePositionOfHome[
                    players.length === 2 && player.id === 2
                      ? player.id
                      : player.id - 1
                  ]?.side
                }
              />
            ))}
          </div>

          <div>
            {players.map((player) => (
              <ActivePlayersIndicator
                key={player.id}
                icon={
                  activePlayersIndicatorsPosition[
                    players.length === 2 && player.id === 2
                      ? player.id
                      : player.id - 1
                  ].icon
                }
                position={
                  activePlayersIndicatorsPosition[
                    players.length === 2 && player.id === 2
                      ? player.id
                      : player.id - 1
                  ].position
                }
                playerId={player.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LudoBoard;
