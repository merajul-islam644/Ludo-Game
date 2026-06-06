// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import { useContext, useEffect, useMemo, useState } from "react";
// import { MapPin } from "lucide-react";
// import { gameContext } from "@/context/GameContextProvider";
// import { colorsMap } from "@/constant/ui.constants";
// import { useMovePiece } from "@/hooks/useMovePiece";

// const DesktopBox = ({ pieces }) => {
//   const { nextTurn } = useContext(gameContext);
//   const { movePiece } = useMovePiece();
//   return (
//     <div className="rounded-2xl border border-cyan-400/20 bg-black/70 p-4 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.08)]">
//       {/* Header */}
//       <div className="mb-3 flex items-center justify-between">
//         <h3 className="text-sm font-semibold tracking-wide text-cyan-300">
//           Safe Zone
//         </h3>
//       </div>

//       {/* Content */}
//       {pieces.length > 0 ? (
//         <div className="grid grid-cols-3 gap-2">
//           {pieces.map((piece) => (
//             <button
//               onClick={() => movePiece(piece.playerStatus, piece.id, nextTurn)}
//               key={`${piece.playerStatus}-${piece.id}`}
//               className="
//             group relative flex h-7 w-7 items-center justify-center
//             rounded-full border border-white/10
//             bg-white/5 transition-all duration-200
//             hover:scale-105 hover:border-cyan-400/40
//             hover:bg-cyan-400/10
//           "
//             >
//               {/* Glow */}
//               <div
//                 className="absolute inset-0 rounded-full blur-sm opacity-40 cursor-pointer"
//                 style={{
//                   backgroundColor: colorsMap[piece.color],
//                 }}
//               />

//               {/* Icon */}
//               <MapPin
//                 size={18}
//                 color={colorsMap[piece.color]}
//                 className="relative z-10 cursor-pointer"
//               />
//             </button>
//           ))}
//         </div>
//       ) : (
//         <div className="flex h-10 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.03]">
//           <span className="text-xs text-white/40">Empty</span>
//         </div>
//       )}
//     </div>
//   );
// };

// const MobileBox = ({ pieces }) => {
//   const { nextTurn } = useContext(gameContext);
//   const { movePiece } = useMovePiece();
//   return (
//     <div className="w-32 rounded-xl border border-cyan-400/20 bg-black/80 p-2 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.06)]">
//       {/* Header */}
//       <div className="mb-3 flex items-center justify-between">
//         <h3 className="text-sm font-semibold tracking-wide text-cyan-300">
//           Safe Zone
//         </h3>
//       </div>

//       {/* Content */}
//       {pieces.length > 0 ? (
//         <div className="grid grid-cols-3 gap-1.5">
//           {pieces.map((piece) => (
//             <button
//               onClick={() => movePiece(piece.playerStatus, piece.id, nextTurn)}
//               key={`${piece.playerStatus}-${piece.id}`}
//               className="
//                 group relative flex h-6 items-center justify-center
//                 rounded-lg border border-white/10
//                 bg-white/5 transition-all duration-200
//                 active:scale-95
//               "
//             >
//               {/* Glow */}
//               <div
//                 className="absolute inset-0 rounded-lg blur-sm opacity-40 cursor-pointer"
//                 style={{
//                   backgroundColor: colorsMap[piece.color],
//                 }}
//               />

//               {/* Icon */}
//               <MapPin
//                 size={16}
//                 color={colorsMap[piece.color]}
//                 className="relative z-10"
//               />
//             </button>
//           ))}
//         </div>
//       ) : (
//         <div
//           className="
//             flex h-14 items-center justify-center rounded-lg
//             border border-dashed border-white/10
//             bg-white/[0.03]
//           "
//         >
//           <span className="text-[10px] text-white/40">Empty</span>
//         </div>
//       )}
//     </div>
//   );
// };

// const AppHint = ({ children, position, className }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const { players } = useContext(gameContext);

//   // detect mobile
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   // 🔥 FIND PIECES ON THIS POSITION
//   const piecesOnBox = useMemo(() => {
//     return players.flatMap((player) =>
//       player.piece
//         .filter((piece) => {
//           // HOME PIECE
//           if (piece.isHome) {
//             return piece.position === position;
//           }

//           // MOVING PIECE ON PATH
//           return player.path?.[piece.stepsMoved] === position;
//         })
//         .map((piece) => ({
//           id: piece.id,
//           playerStatus: player.status,
//           color: player.color,
//         })),
//     );
//   }, [players, position]);

//   // ----------------------
//   // MOBILE (POPOVER)
//   // ----------------------
//   if (isMobile) {
//     return (
//       <Popover>
//         <PopoverTrigger asChild>{children}</PopoverTrigger>

//         <PopoverContent
//           side="top"
//           className={`bg-transparent border-none shadow-none p-0 ${className}`}
//         >
//           <MobileBox pieces={piecesOnBox} position={position} />
//         </PopoverContent>
//       </Popover>
//     );
//   }

//   // ----------------------
//   // DESKTOP (TOOLTIP)
//   // ----------------------
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>{children}</TooltipTrigger>

//         <TooltipContent
//           side={`${position === 92 ? "top" : position === 24 ? "right" : position === 134 ? "bottom" : "left"}`}
//           className={`bg-transparent border-none shadow-none p-0 ${className}`}
//         >
//           <DesktopBox pieces={piecesOnBox} position={position} />
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

// export default AppHint;

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useContext, useEffect, useMemo, useState } from "react";
import { Loader, MapPin } from "lucide-react";
import { gameContext } from "@/context/GameContextProvider";
import { colorsMap } from "@/constant/ui.constants";
import { useMovePiece } from "@/hooks/useMovePiece";
import { getShowLoader, getShowTile } from "@/game-engine/cellIndicator";

const DesktopBox = ({ pieces, showLoader, showTile }) => {
  const { nextTurn, isRoled, activePlayer } = useContext(gameContext);
  const { movePiece } = useMovePiece();
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-black/70 p-4 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.08)]">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide text-cyan-300">
          Safe Zone
        </h3>
      </div>

      {/* Content */}
      {pieces.length > 0 ? (
        <div className="grid grid-cols-3">
          {pieces.map((piece) => (
            <div
              onClick={() => movePiece(piece.playerStatus, piece.id, nextTurn)}
              key={`${piece.playerStatus}-${piece.id}`}
              className="relative flex items-center justify-center cursor-pointer"
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
                  backgroundColor: colorsMap[piece.color],
                }}
              />

              {showLoader && isRoled && activePlayer === piece.playerStatus ? (
                <Loader className="absolute top-5 animate-spin" />
              ) : (
                showTile && (
                  <div className="absolute top-5 -z-10 border-3 border-slate-500 h-5 w-5 rounded-full bg-white" />
                )
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-10 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/3">
          <span className="text-xs text-white/40">Empty</span>
        </div>
      )}
    </div>
  );
};

const MobileBox = ({ pieces }) => {
  const { nextTurn } = useContext(gameContext);
  const { movePiece } = useMovePiece();
  return (
    <div className="w-32 rounded-xl border border-cyan-400/20 bg-black/80 p-2 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.06)]">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide text-cyan-300">
          Safe Zone
        </h3>
      </div>

      {/* Content */}
      {pieces.length > 0 ? (
        <div className="grid grid-cols-3 gap-1.5">
          {pieces.map((piece) => (
            <button
              onClick={() => movePiece(piece.playerStatus, piece.id, nextTurn)}
              key={`${piece.playerStatus}-${piece.id}`}
              className="
                group relative flex h-6 items-center justify-center
                rounded-lg border border-white/10
                bg-white/5 transition-all duration-200
                active:scale-95
              "
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-lg blur-sm opacity-40 cursor-pointer"
                style={{
                  backgroundColor: colorsMap[piece.color],
                }}
              />

              {/* Icon */}
              <MapPin
                size={16}
                color={colorsMap[piece.color]}
                className="relative z-10"
              />
            </button>
          ))}
        </div>
      ) : (
        <div
          className="
            flex h-14 items-center justify-center rounded-lg
            border border-dashed border-white/10
            bg-white/3
          "
        >
          <span className="text-[10px] text-white/40">Empty</span>
        </div>
      )}
    </div>
  );
};

const AppHint = ({
  children,
  position,
  className,
  activePlayer,
  allPath,
  diceValue,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const { players } = useContext(gameContext);
  const showLoader = getShowLoader(players, activePlayer, allPath, diceValue);
  const showTile = getShowTile(players, allPath);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔥 FIND PIECES ON THIS POSITION
  const piecesOnBox = useMemo(() => {
    return players.flatMap((player) =>
      player.piece
        ?.filter((piece) => {
          // HOME PIECE
          if (piece.isHome) {
            return piece.position === position;
          }

          // MOVING PIECE ON PATH
          return player.path?.[piece.stepsMoved] === position;
        })
        .map((piece) => ({
          id: piece.id,
          playerStatus: player.status,
          color: player.color,
        })),
    );
  }, [players, position]);

  // ----------------------
  // MOBILE (POPOVER)
  // ----------------------
  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>

        <PopoverContent
          side="top"
          className={`bg-transparent border-none shadow-none p-0 ${className}`}
        >
          <MobileBox pieces={piecesOnBox} position={position} />
        </PopoverContent>
      </Popover>
    );
  }

  // ----------------------
  // DESKTOP (TOOLTIP)
  // ----------------------
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent
          side={`${position === 92 ? "top" : position === 24 ? "right" : position === 134 ? "bottom" : "left"}`}
          className={`bg-transparent border-none shadow-none p-0 ${className}`}
        >
          <DesktopBox
            pieces={piecesOnBox}
            position={position}
            showLoader={showLoader}
            showTile={showTile}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AppHint;
