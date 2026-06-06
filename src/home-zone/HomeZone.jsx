import { useContext } from "react";
import { Loader, MapPin } from "lucide-react";
import { safeZone } from "@/constants/constants";
import { gameContext } from "@/context/GameContextProvider";

const HomeZone = ({ position, color, pieces, playerId }) => {
  const { setPlayers, hasRoled, diceValue, currentPlayerId, setHasRoled } =
    useContext(gameContext);
  const releasePiece = (pieceId) => {
    setHasRoled(false);
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === playerId
          ? {
              ...player,
              pieces: player.pieces.map((piece) =>
                piece.id === pieceId
                  ? {
                      ...piece,
                      isHome: false,
                      currentPosition: safeZone[player.id - 1],
                      retrieveId: player.id,
                      color: player.color,
                    }
                  : piece,
              ),
            }
          : player,
      ),
    );
  };

  return (
    <div
      className={`flex justify-center items-center h-42 w-42 absolute ${position}`}
    >
      <div className="grid grid-cols-2 gap-x-11 gap-y-4">
        {pieces.map((piece) => (
          <div
            key={piece.id}
            className="relative flex items-center justify-center"
          >
            <div
              className={`border border-black rounded-full h-7 w-7 ${color}`}
            />

            {piece.isHome ? (
              <div
                onClick={() => {
                  if (diceValue === 6 && hasRoled) {
                    releasePiece(piece.id);
                  }
                }}
              >
                <MapPin
                  fill="white"
                  strokeWidth={1}
                  className="absolute z-10 h-12.5 w-8.75 -top-5.5 left-1/2 -translate-x-1/2"
                />

                <div className="absolute border-4 border-black h-5 w-5 rounded-full top-1 left-1/2 -translate-x-1/2" />

                {hasRoled &&
                  diceValue === 6 &&
                  currentPlayerId === playerId && (
                    <Loader
                      size={30}
                      className="absolute top-0 left-1/2 -translate-x-1/2 animate-spin"
                    />
                  )}

                <div
                  className={`absolute z-30 border-2 border-black h-5 w-5 rounded-full -top-2.5 left-1/2 -translate-x-1/2 ${color}`}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeZone;