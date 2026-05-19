import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { gameContext } from "@/context/GameContext";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashBoard = () => {
  const { dispatch } = useContext(gameContext);

  const [user, setUser] = useState(null);
  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      toast.success("Logout Successfully");

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-4 py-10">
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-red-500/30 blur-3xl" />

      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-green-500/30 blur-3xl" />

      <div className="absolute top-[40%] left-[45%] h-80 w-80 rounded-full bg-yellow-500/20 blur-3xl" />

      {/* CONTAINER */}
      <div className="relative w-full max-w-7xl grid lg:grid-cols-2 gap-8 items-center">
        {/* LEFT SIDE - GAME CARD */}
        <div className="relative overflow-hidden rounded-[32px] border border-cyan-400/20 bg-black/30 backdrop-blur-2xl shadow-[0_25px_120px_rgba(0,0,0,0.8)]">
          {/* NEON GLOW BACK LAYER */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/30 blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl animate-pulse" />
            <div className="absolute top-[40%] left-[30%] h-64 w-64 rounded-full bg-pink-500/20 blur-3xl animate-pulse" />
          </div>

          {/* TOP BAR */}
          <div className="h-2 bg-linear-to-r from-pink-500 via-purple-500 via-cyan-400 to-green-400" />

          <div className="p-6 md:p-8 space-y-6 relative z-10">
            {/* TITLE */}
            <div className="text-center space-y-3">
              <div className="flex justify-center gap-2">
                <div className="h-4 w-4 rounded-full bg-pink-500 animate-pulse shadow-[0_0_15px_pink]" />
                <div className="h-4 w-4 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_15px_cyan]" />
                <div className="h-4 w-4 rounded-full bg-purple-500 animate-pulse shadow-[0_0_15px_purple]" />
                <div className="h-4 w-4 rounded-full bg-green-400 animate-pulse shadow-[0_0_15px_lime]" />
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-[10px] text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-cyan-400 to-purple-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                LUDO
              </h1>

              <p className="text-gray-300 text-sm tracking-widest">
                Multiplayer Neon Battle Arena
              </p>
            </div>

            {/* BUTTONS */}
            <div className="space-y-4">
              <Button
                onClick={() =>
                  dispatch({ type: "OPEN_MODAL", payload: "SELECT_PLAYER" })
                }
                className="
    w-full h-14 rounded-2xl text-lg font-bold cursor-pointer border-none
    bg-linear-to-r from-violet-500 via-fuchsia-500 to-purple-600
    text-white shadow-[0_0_30px_rgba(168,85,247,0.5)]
    hover:scale-[1.02] transition-all duration-300
  "
              >
                Select Player
              </Button>

              <Button
                onClick={() =>
                  dispatch({ type: "OPEN_MODAL", payload: "SELECT_PIECE" })
                }
                className="
    w-full h-14 rounded-2xl text-lg font-bold cursor-pointer border-none
    bg-linear-to-r from-emerald-400 via-green-500 to-lime-500
    text-white shadow-[0_0_30px_rgba(34,197,94,0.5)]
    hover:scale-[1.02] transition-all duration-300
  "
              >
                Select Piece
              </Button>

              <Button
                onClick={() =>
                  dispatch({ type: "OPEN_MODAL", payload: "SELECT_COLOR" })
                }
                className="
    w-full h-14 rounded-2xl text-lg font-bold cursor-pointer border-none
    bg-linear-to-r from-orange-400 via-pink-500 to-yellow-400
    text-white shadow-[0_0_30px_rgba(236,72,153,0.5)]
    hover:scale-[1.02] transition-all duration-300
  "
              >
                Select Color
              </Button>

              <Button
                onClick={() => navigate("/ludoBoard")}
                className="w-full h-16 rounded-2xl text-xl font-black tracking-wide cursor-pointer border-none bg-linear-to-r from-green-400 via-cyan-400 to-blue-500 text-white shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:scale-[1.03] transition-all duration-300"
              >
                PLAY NOW
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN CARD */}
        <div className="relative overflow-hidden rounded-[32px] border border-cyan-400/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
          {/* TOP BAR */}
          <div className="h-2 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500" />

          {/* CONTENT */}
          <div className="p-6 md:p-8 relative z-10 flex flex-col items-center justify-center space-y-6">
            {/* LOGO DICE */}
            <div className="relative transition">
              <div className="text-7xl animate-[spin_3s_linear_infinite] drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                🎲
              </div>

              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl scale-150 animate-pulse" />
            </div>

            {/* BUTTON */}
            <Button
              onClick={() => handleLogout()}
              className="w-full h-16 rounded-2xl border-none bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 text-white text-xl font-black tracking-wide shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              LOGIN TO PLAY ONLINE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
