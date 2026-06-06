import { gameContext } from "@/context/GameContextProvider";
import { useContext } from "react";

const ActivePlayersIndicator = ({ icon, position, playerId }) => {
  const { currentPlayerId } = useContext(gameContext);

  return (
    <div className={`absolute ${position}`}>
      {currentPlayerId === playerId && (
        <div className="text-3xl animate-[bounceX_0.3s_infinite]">{icon}</div>
      )}
    </div>
  );
};


export default ActivePlayersIndicator;