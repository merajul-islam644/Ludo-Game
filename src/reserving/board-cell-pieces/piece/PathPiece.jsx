// import { endZone } from "@/constant/boardPaths.constants";
// import { colorsMap } from "@/constant/ui.constants";
// import { gameContext } from "@/context/GameContextProvider";
// import { useMovePiece } from "@/hooks/useMovePiece";
// import { MapPin } from "lucide-react";
// import { useContext } from "react";

// const PathPiece = ({ player, piece, activePlayer, isRoled, allPath }) => {
//   const { diceValue } = useContext(gameContext);
//   const { movePiece } = useMovePiece();
//   return player?.path?.map((p, index) =>
//     p === allPath && index === piece.stepsMoved ? (
//       <div
//         key={`${player.status}-${piece.id}-${index}`}
//         onClick={() => {
//           if (
//             activePlayer === player.status &&
//             isRoled &&
//             !endZone.includes(p) &&
//             piece.stepsMoved + diceValue < player.path.length
//           ) {
//             movePiece(player.status, piece.id);
//           }
//         }}
//         className="absolute z-10 right-[0.3px] -top-4.5 w-[30px] h-[30px] cursor-pointer"
//       >
//         <div>
//           <MapPin
//             size={35}
//             color="white"
//             fill="white"
//             className="cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
//             style={{ transform: "scale(0.9, 1)" }}
//           />

//           <div
//             className="absolute top-[2px] left-[7.5px] w-5 h-5 rounded-full border border-slate-500"
//             style={{ backgroundColor: colorsMap[player.color] }}
//           />
//         </div>
//       </div>
//     ) : null,
//   );
// };

// export default PathPiece;
import { endZone } from "@/constant/boardPaths.constants";
import { colorsMap } from "@/constant/ui.constants";
import { gameContext } from "@/context/GameContextProvider";
import { getShowLoader, getShowTile } from "@/game-engine/cellIndicator";
import { useMovePiece } from "@/hooks/useMovePiece";
import { Loader, MapPin } from "lucide-react";
import { useContext } from "react";

const PathPiece = ({ player, piece, activePlayer, isRoled, allPath }) => {
  const { players, diceValue } = useContext(gameContext);
  const { movePiece } = useMovePiece();
  const showLoader = getShowLoader(players, activePlayer, allPath, diceValue);
  const showTile = getShowTile(players, allPath);
  return player?.path?.map((p, index) =>
    p === allPath && index === piece.stepsMoved ? (
      <div
        key={`${player.status}-${piece.id}-${index}`}
        onClick={() => {
          if (
            activePlayer === player.status &&
            isRoled &&
            !endZone.includes(p) &&
            piece.stepsMoved + diceValue < player.path.length
          ) {
            movePiece(player.status, piece.id);
          }
        }}
        className="absolute -left-4.5 -top-7.5 z-50  flex items-center justify-center cursor-pointer"
      >
        {/* Pin */}
        <MapPin
          size={35}
          color="white"
          fill="white"
          className="drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
          style={{ transform: "scale(0.9, 1)" }}
        />

        {/* Piece */}
        <div
          className="absolute top-0.5 h-5 w-5 rounded-full border border-slate-500"
          style={{
            backgroundColor: colorsMap[player.color],
          }}
        />

        {showLoader && isRoled ? (
          <Loader className="absolute -z-10 left-1.5 top-5 animate-spin " />
        ) : (
          showTile && (
            <div className="absolute top-5 border-3 -z-10 border-slate-500 h-5 w-5 rounded-full" />
          )
        )}
      </div>
    ) : null,
  );
};

export default PathPiece;
