import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { gameContext } from "@/context/GameContextProvider";

const DashBoard = () => {
  const { dispatch } = useContext(gameContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) navigate("/");
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
      {/* Neon Background Orbs */}
      <div className="absolute w-125 h-125 bg-pink-500/30 blur-[140px] rounded-full -top-30 -left-30" />
      <div className="absolute w-125 h-125 bg-cyan-400/30 blur-[140px] rounded-full -bottom-30 -left-30" />
      <div className="absolute w-125 h-125 bg-purple-600/30 blur-[120px] rounded-full top-[40%] left-[45%]" />

      {/* Card */}
      <div className="w-full max-w-md relative">
        {/* Outer Glow Border */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-pink-500 via-cyan-400 to-purple-600 blur-xl opacity-40" />

        <div className="relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-8 space-y-6 shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-black tracking-[6px] text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-cyan-400 to-purple-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
              LUDO
            </h1>

            <p className="text-gray-300 text-xs tracking-widest uppercase">
              Neon Battle Arena
            </p>
          </div>

          {/* Divider Glow */}
          <div className="h-0.5 bg-linear-to-r from-pink-500 via-cyan-400 to-purple-500 shadow-[0_0_20px_cyan]" />

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() =>
                dispatch({ type: "OPEN_MODAL", payload: "SELECT_PLAYER" })
              }
              className="w-full h-12 rounded-xl font-bold text-white bg-linear-to-r from-fuchsia-500 via-pink-500 to-orange-400 shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:scale-[1.03] transition"
            >
              Select Player
            </Button>

            <Button
              onClick={handleLogout}
              className="w-full h-12 rounded-xl font-bold text-white bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:scale-[1.03] transition"
            >
              Login to Play online
            </Button>
          </div>

          {/* Dice Glow Section */}
          <div className="flex flex-col items-center pt-4 relative">
            <div className="absolute w-24 h-24 bg-cyan-400/30 blur-2xl rounded-full animate-pulse" />

            <div className="text-7xl animate-[spin_3s_linear_infinite] drop-shadow-[0_0_25px_cyan]">
              🎲
            </div>

            <p className="text-xs text-gray-400 tracking-widest mt-2">
              READY TO BATTLE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
