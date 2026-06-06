import { useContext } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Loader,
  MapPin,
  Star,
} from "lucide-react";
import { gameContext } from "@/context/GameContextProvider";
import {
  boardPath,
  borderArea,
  endZone,
  homeAreaFour,
  homeAreaTwo,
  pulseHomeArea,
  safeZone,
} from "@/constants/constants";

const GridBoard = ({ players }) => {
  const {
    setPlayers,
    diceValue,
    hasRoled,
    setHasRoled,
    currentPlayerId,
    nextTurn,
    setMovingPiecerOPlayerId,
    movingPieceOrPlayerId,
  } = useContext(gameContext);

  const directionIcons = {
    8: <ArrowDown color="green" />,
    120: <ArrowLeft color="yellow" />,
    218: <ArrowUp color="cyan" />,
    106: <ArrowRight color="red" />,
  };

  const starPaths = new Set([37, 104, 189, 123]);

  const setIcon = (path) => {
    if (directionIcons[path]) return directionIcons[path];
    if (starPaths.has(path)) return <Star />;
    return null;
  };

  const movePiece = (playerId, pieceId) => {
    setMovingPiecerOPlayerId({ pieceId, playerId });
    setHasRoled(false);

    const movingPlayer = players.find((p) => p.id === playerId);
    const movingPiece = movingPlayer.pieces.find((p) => p.id === pieceId);

    const finalPosition = movingPlayer.path[movingPiece.stepsMoved + diceValue];

    let count = 0;

    const step = () => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.id !== playerId) return player;

          return {
            ...player,
            pieces: player.pieces.map((piece) => {
              if (piece.id !== pieceId) return piece;

              const newPosition = player.path[piece.stepsMoved + 1];

              return {
                ...piece,
                stepsMoved: piece.stepsMoved + 1,
                currentPosition: newPosition,
              };
            }),
          };
        }),
      );

      count++;

      if (count < diceValue) {
        setTimeout(step, 250);
        return;
      }

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.id === playerId) return player;

          return {
            ...player,
            pieces: player.pieces.map((piece) =>
              piece.currentPosition === finalPosition &&
              !safeZone.includes(finalPosition)
                ? {
                    ...piece,
                    currentPosition: 0,
                    isHome: true,
                    stepsMoved: 0,
                  }
                : piece,
            ),
          };
        }),
      );

      if (diceValue < 6) {
        nextTurn();
      }
    };

    setTimeout(step, 250);
  };
  return (
    <div className="grid grid-cols-15">
      {boardPath.map((path) => {
        const colorHomeArea = players.find((p) => p.homeArea?.includes(path));

        const homeColor = colorHomeArea ? colorHomeArea.color : "";

        const border = borderArea.includes(path) ? "border border-black" : "";

        const pulse =
          pulseHomeArea.includes(path) && currentPlayerId === colorHomeArea?.id
            ? "animate-[pulse_0.3s_infinite]"
            : "";

        const playerTwo =
          players.length === 2 && homeAreaTwo.includes(path)
            ? "bg-green-500"
            : "";

        const playerFour =
          players.length === 2 && homeAreaFour.includes(path)
            ? "bg-cyan-500"
            : "";

        return (
          <div key={path}>
            <div
              className={`relative h-7 w-7 flex items-center justify-center
                ${homeColor} ${border} ${pulse} ${playerTwo} ${playerFour}`}
            >
              <div className="absolute">{setIcon(path)}</div>
              {/* {path} */}

              <div>
                {players.map((player) =>
                  player.pieces.map((piece) => {
                    const index = piece.stepsMoved;
                    const currentCell = player.path[index];

                    if (
                      currentCell !== path ||
                      piece.isHome ||
                      safeZone.includes(path) ||
                      endZone.includes(path)
                    )
                      return null;

                    return (
                      <div
                        key={`${player.id}-${piece.id}`}
                        onClick={() => {
                          if (
                            currentPlayerId === player.id &&
                            hasRoled &&
                            piece.stepsMoved + diceValue <=
                              player.path.length - 1
                          ) {
                            movePiece(player.id, piece.id);
                          }
                        }}
                        className={`${movingPieceOrPlayerId.pieceId === piece.id && movingPieceOrPlayerId.playerId === player.id ? "moveStep" : ""}`}
                      >
                        <MapPin
                          fill="white"
                          strokeWidth={1}
                          className="absolute z-10 h-12 w-8.75 -top-5.5 left-1/2 -translate-x-1/2"
                        />

                        <div className="absolute border-4 border-black h-5 w-5 rounded-full top-1 left-1/2 -translate-x-1/2" />

                        {hasRoled &&
                          currentPlayerId === player.id &&
                          !endZone.includes(path) && (
                            <Loader
                              size={30}
                              className="absolute -top-0.5 left-1/2 -translate-x-1/2 animate-spin"
                            />
                          )}

                        <div
                          className={`absolute z-30 border-2 border-black h-5 w-5 rounded-full -top-2.5 left-1/2 -translate-x-1/2 ${player.color}`}
                        />
                      </div>
                    );
                  }),
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default GridBoard;
