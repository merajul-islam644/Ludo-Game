import HomePiece from "./piece/HomePiece";
import PathPiece from "./piece/PathPiece";

const BoardCellPieces = (props) => {
  const { players, allPath } = props;

  return (
    <div>
      {players?.map((player) =>
        player?.piece?.map((piece, index) => {
          if (piece.isHome && piece.position === allPath) {
            return (
              <HomePiece
                key={`${player.status}-${piece.id}-${index}`}
                player={player}
                piece={piece}
                allPath={allPath}
                {...props}
              />
            );
          }

          if (!piece.isHome) {
            return (
              <PathPiece
                key={`${player.status}-${piece.id}-${index}`}
                player={player}
                piece={piece}
                allPath={allPath}
                {...props}
              />
            );
          }

          return null;
        }),
      )}
    </div>
  );
};

export default BoardCellPieces;
