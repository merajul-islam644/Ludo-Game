import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { gameContext } from "@/context/GameContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const generateRoomCode = () =>
  Math.random().toString(36).slice(2, 8).toUpperCase();

const RoomModal = ({ onClose }) => {
  const { setGameMode, setRoomId, setMyPlayerId, claimSeat, dispatch } =
    useContext(gameContext);
  const [joinCode, setJoinCode] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    const code = generateRoomCode();
    setGameMode("online");
    setRoomId(code);
    // Host always sits in seat 1.
    await claimSeat(code, 1);
    toast.success(`Room created: ${code}`);
    dispatch({ type: "OPEN_MODAL", payload: "SELECT_PLAYER" });
  };

  const handleJoinRoom = () => {
    const code = joinCode.trim().toUpperCase();
    if (!code) return;

    setGameMode("online");
    setRoomId(code);
    // Seat isn't chosen yet — the board will prompt for one once players load.
    setMyPlayerId(null);
    dispatch({ type: "CLOSE_MODAL" });
    navigate("/ludoBoard");
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
      <div className="absolute inset-0 rounded-[26px] bg-cyan-500/10 blur-sm opacity-30" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/10 blur-[80px] rounded-full" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[90px] rounded-full" />

      <div className="relative z-10 p-6 space-y-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-white text-lg font-bold">
            Play Online
          </DialogTitle>
          <div className="h-0.5 w-16 mx-auto mt-2 bg-cyan-400/60 rounded-full" />
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-gray-300 text-sm">Start a new game and share the room code with friends.</p>
          <Button
            onClick={handleCreateRoom}
            className="w-full h-11 rounded-xl font-semibold text-white bg-cyan-500 hover:bg-cyan-400 cursor-pointer transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.25)]"
          >
            Create Room
          </Button>
        </div>

        <div className="text-center text-gray-400 text-xs">OR</div>

        <div className="space-y-2">
          <Label className="text-gray-300">Have a room code?</Label>
          <Input
            placeholder="Enter room code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="bg-white/5 border border-cyan-400/20 text-white focus-visible:ring-cyan-400 rounded-xl uppercase"
          />
          <Button
            onClick={handleJoinRoom}
            disabled={!joinCode.trim()}
            className="w-full h-11 rounded-xl font-semibold text-white bg-purple-500 hover:bg-purple-400 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Join Room
          </Button>
        </div>

        <div className="flex justify-end">
          <Button
            variant="destructive"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-white transition cursor-pointer bg-red-500 hover:bg-red-600"
          >
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default RoomModal;
