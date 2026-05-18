import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  pieceOfHome1,
  pieceOfHome2,
  pieceOfHome3,
  pieceOfHome4,
} from "@/constant/homeAreas.constants";
import { gameContext } from "@/constext/GameContext";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { useContext } from "react";

const createPieces = (count, startPositions) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    position: startPositions[i] ?? null,
    isActive: false,
    isHome: true,
    stepsMoved: 0,
    currentPosition: null,
  }));
};

const homeMap = {
  "player-1": pieceOfHome1,
  "player-2": pieceOfHome2,
  "player-3": pieceOfHome3,
  "player-4": pieceOfHome4,
};

const PieceSelectModal = ({ onClose, confirm, title, content }) => {
  const { players, setPlayers } = useContext(gameContext);

  const handlePieceChange = (value) => {
    const count = Number(value);

    const updatedPlayers = players.map((player) => {
      const actualPosition = homeMap[player.status] || [];

      return {
        ...player,
        piece: createPieces(count, actualPosition),
      };
    });

    setPlayers(updatedPlayers);
  };

  return (
    <DialogContent
      className="
        fixed left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        w-[92%] sm:max-w-md
        rounded-[26px]
        bg-black/60 backdrop-blur-2xl
        border border-white/10
        shadow-[0_0_60px_rgba(0,200,255,0.15)]
        overflow-hidden
      "
    >
      {/* Glow Background */}
      <div className="absolute inset-0 rounded-[26px] bg-cyan-500/10 blur-sm opacity-30" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/10 blur-[80px] rounded-full" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[90px] rounded-full" />

      <div className="relative z-10 p-6">
        {/* Header */}
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-white text-lg font-bold">
            {title}
          </DialogTitle>
          <div className="h-0.5 w-16 mx-auto mt-2 bg-cyan-400/60 rounded-full" />
        </DialogHeader>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {content.map((num) => (
            <button
              key={num}
              onClick={() => handlePieceChange(num)}
              className={cn(
                `
                  aspect-square w-full
                  flex flex-col items-center justify-center cursor-pointer
                  rounded-xl
                  text-white font-semibold
                  border border-white/10
                  bg-white/5
                  hover:bg-cyan-500/10
                  hover:border-cyan-400/40
                  transition-all duration-300
                `,
                players[0].piece.length === num &&
                  "border-cyan-400/40 bg-cyan-500/10",
              )}
            >
              {/* Circles */}
              <div className="flex items-center">
                {Array.from({ length: num }).map((_, i) => (
                  <Circle
                    key={i}
                    className="h-4 w-4 text-pink-300 -ml-1 first:ml-0"
                  />
                ))}
              </div>

              {/* Label */}
              <div className="mt-2 text-lg font-bold">
                {num}
                <span className="ml-1 text-xs opacity-70">PIECES</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-1 justify-end">
          <div className="flex justify-end mt-6">
            <Button
              onClick={onClose}
              className="px-4 py-2 rounded-xl cursor-pointer bg-red-500 hover:bg-red-600"
            >
              Cancel
            </Button>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              onClick={confirm}
              className="
              px-4 py-2 rounded-xl
              font-semibold text-white cursor-pointer

              bg-cyan-500 hover:bg-cyan-400
              transition-all duration-300

              shadow-[0_0_25px_rgba(34,211,238,0.25)]
            "
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default PieceSelectModal;
