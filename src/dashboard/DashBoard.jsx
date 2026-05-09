import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import SelectPlayer from "./select-player/SelectPlayer";
import SelectPiece from "./select-piece/SelectPiece";
import { gameContext } from "@/constext/GameContext";
import Modal from "@/modal/Modal";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashBoard = () => {
  const {
    handleNavigateToLudoBoard,
    error,
    setIsOpenModal,
    players,
    handleColorSetModal,
  } = useContext(gameContext);
  const [user, setUser] = useState(null);
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
      navigate("/");
      toast.success("Logout successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm shadow-lg rounded">
        <CardHeader>
          <CardTitle className="text-xl text-center">Configure Game</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Select Players</p>
            <SelectPlayer />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">Select Pieces</p>
            <SelectPiece />
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleColorSetModal}
              variant="outline"
              className="w-full rounded cursor-pointer"
            >
              Select Color
            </Button>

            <p className="text-sm text-red-500 ">{error.colorSelectionError}</p>

            <Button
              onClick={() => handleNavigateToLudoBoard()}
              variant="outline"
              className="w-full rounded cursor-pointer bg-green-400 hover:bg-green-500 text-white text-lg hover:text-white"
            >
              Play
            </Button>

            {user && (
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full rounded cursor-pointer"
              >
                Logout
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Modal
        title="Select Color"
        content={players}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};

export default DashBoard;
