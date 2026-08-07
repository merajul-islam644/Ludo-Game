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
import { useMovePiece } from "@/hooks/useMovePiece";
import {
  boardPath,
  borderArea,
  colorClasses,
  endZone,
  homeObject,
  pulseHomeArea,
  safeZone,
} from "@/constants/constants";

const GridBoard = ({ players }) => {
  const {
    diceValue,
    hasRoled,
    currentPlayerId,
    movingPieceOrPlayerId,
    gameMode,
    myPlayerId,
  } = useContext(gameContext);
  const movePiece = useMovePiece();

  const canControl = (playerId) =>
    gameMode !== "online" || myPlayerId === playerId;

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

  // Slots (1-4) not currently occupied by a real player still need their
  // home-area quadrant colored on the board, otherwise that whole corner
  // renders blank/unstyled — previously this only ever handled exactly
  // 2 players (hardcoded to slots 2 & 4), so 3-player games left slot 4's
  // quadrant completely uncolored.
  const usedColors = new Set(players.map((p) => p.color));
  const unusedHomeColor = (path) => {
    const slot = Object.keys(homeObject).find(
      (slotId) => homeObject[slotId].includes(path) && !usedColors.has(colorClasses[slotId]),
    );
    return slot ? colorClasses[slot] : "";
  };

  return (
    <div className="grid grid-cols-15">
      {boardPath.map((path) => {
        const colorHomeArea = players.find((p) => p.homeArea?.includes(path));

        const homeColor = colorHomeArea
          ? colorHomeArea.color
          : unusedHomeColor(path);

        const border = borderArea.includes(path) ? "border border-black" : "";

        const pulse =
          pulseHomeArea.includes(path) && currentPlayerId === colorHomeArea?.id
            ? "animate-[pulse_0.3s_infinite]"
            : "";

        return (
          <div key={path}>
            <div
              className={`relative h-7 w-7 flex items-center justify-center
                ${homeColor} ${border} ${pulse}`}
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
                            canControl(player.id) &&
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
