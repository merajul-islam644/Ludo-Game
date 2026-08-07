import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useContext } from "react";
import { gameContext } from "@/context/GameContextProvider";
import { SelectColor } from "@/select-color/SelectColor";
import { useNavigate } from "react-router-dom";

const ColorSelectModal = ({ onClose }) => {
  const { players, dispatch } = useContext(gameContext);
  const navigate = useNavigate();

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
      {/* BASE GLOW SYSTEM (same as other modals) */}
      <div className="absolute inset-0 rounded-[26px] bg-cyan-500/10 blur-sm opacity-30" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/10 blur-[80px] rounded-full" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[90px] rounded-full" />

      <div className="relative z-10 p-6">
        {/* HEADER */}
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-white text-lg font-bold tracking-wide">
            Select Color
          </DialogTitle>

          <div className="h-0.5 w-16 mx-auto mt-2 bg-cyan-400/60 rounded-full" />
        </DialogHeader>

        {/* PLAYER COLOR LIST */}
        <div className="space-y-3">
          {players?.map((player) => (
            <SelectColor key={player.id} player={player} />
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="destructive"
            onClick={onClose}
            className="
              px-4 py-2 rounded-xl
              text-white
              transition cursor-pointer bg-red-500 hover:bg-red-600
            "
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              navigate("/ludoBoard");
              dispatch({ type: "CLOSE_MODAL" });
            }}
            className="
              px-4 py-2 rounded-xl
              font-semibold text-white

              bg-cyan-500 hover:bg-cyan-400 cursor-pointer
              transition-all duration-300

              shadow-[0_0_25px_rgba(34,211,238,0.25)]
            "
          >
            Play
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ColorSelectModal;
