import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ConfirmationModal = ({ onClose, confirm, title, content }) => {
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
      {/* BASE GLOW SYSTEM (same as all modals) */}
      <div className="absolute inset-0 rounded-[26px] bg-cyan-500/10 blur-sm opacity-30" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/10 blur-[80px] rounded-full" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[90px] rounded-full" />

      <div className="relative z-10 p-6">
        {/* HEADER */}
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-white font-bold text-lg tracking-wide">
            {title}
          </DialogTitle>

          <div className="h-0.5 w-16 mx-auto mt-2 bg-cyan-400/60 rounded-full" />
        </DialogHeader>

        {/* CONTENT */}
        <div className="text-center text-gray-300 text-sm leading-relaxed">
          {content}
        </div>

        {/* ACTIONS */}
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
            onClick={confirm}
            className="
              px-4 py-2 rounded-xl
              font-semibold text-white cursor-pointer

              bg-cyan-500 hover:bg-cyan-400
              transition-all duration-300

              shadow-[0_0_25px_rgba(34,211,238,0.25)]
            "
          >
            Confirm
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ConfirmationModal;
