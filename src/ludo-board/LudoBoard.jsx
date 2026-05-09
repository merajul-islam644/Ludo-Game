import { Button } from "@/components/ui/button";
import {
  colorsMap,
  path,
  setBorderAndColor,
  setIcon,
} from "@/constant/constant";
import { gameContext } from "@/constext/GameContext";
import Dice from "@/dice/Dice";
import Modal from "@/modal/Modal";
import { MapPin } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const EndZone = ({ size = 85, player1, player2, player3, player4 }) => {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: size, height: size }}
    >
      {/* top left */}
      <div
        className={`absolute content-center inset-0 ${player1?.color}`}
        style={{ clipPath: "polygon(50% 50%, 0% 100%, 0% 0%)" }}
      >
        {player1?.piece?.map((piece) =>
          piece.stepsMoved >= (player1.path?.length || 0) && !piece.isHome ? (
            <div
              key={`${player1.status}-${piece.id}`}
              className={`${player1?.color} h-3 w-3 rounded-full cursor-pointer border-3 border-white`}
            />
          ) : null,
        )}
      </div>

      {/* top right */}
      <div
        className={`absolute inset-0 ${player2?.color}`}
        style={{ clipPath: "polygon(50% 50%, 0% 0%, 100% 0%)" }}
      >
        {player2?.piece?.map((piece) =>
          piece.stepsMoved >= (player2?.path?.length || 0) && !piece.isHome ? (
            <div
              key={`${player2.status}-${piece.id}`}
              className={`${player2?.color} h-3 w-3 rounded-full cursor-pointer border-2 border-white`}
            />
          ) : null,
        )}
      </div>

      {/* bottom right */}
      <div
        className={`absolute inset-0 ${player3?.color}`}
        style={{ clipPath: "polygon(50% 50%, 100% 0%, 100% 100%)" }}
      />

      {/* bottom left */}
      <div
        className={`absolute inset-0 ${player4?.color}`}
        style={{ clipPath: "polygon(50% 50%, 100% 100%, 0% 100%)" }}
      />
    </div>
  );
};

const LudoBoard = () => {
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const playersArray = ["P1", "P2", "P3", "P4"];

  const activePlayer = playersArray[currentPlayer];

  const nextTurn = () => {
    setCurrentPlayer((prev) => (prev + 1) % playersArray.length);
  };
  const {
    players,
    handleToggle,
    handleIncreacseStep,
    setIsOpenModal,
    setPlayers,
    // handleCancelPiece,
  } = useContext(gameContext);

  const player1 = players?.find((p) => p.status === "player-1");
  const player2 = players?.find((p) => p.status === "player-2");
  const player3 = players?.find((p) => p.status === "player-3");
  const player4 = players?.find((p) => p.status === "player-4");

  const quitGame = () => {
    setTimeout(() => {
      localStorage.removeItem("players");
      setPlayers([]);
    }, 300);
    setIsOpenModal(false);
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="absolute top-[1%] left-1/2 -translate-x-1/2">
        <div className="flex justify-center ">
          <Button
            onClick={() => setIsOpenModal(true)}
            variant="destructive"
            className="cursor-pointer"
          >
            Quit
          </Button>
        </div>
        <div className="flex gap-45">
          <div className="flex justify-center items-center">
            <Dice myPlayer="P1" activePlayer={activePlayer} />
            <MapPin color={colorsMap[player1?.color]} />
          </div>

          <div className="flex justify-center items-center">
            <Dice myPlayer="P2" activePlayer={activePlayer} />
            <MapPin color={colorsMap[player2?.color]} />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-15 place-items-center relative">
          {path.map((allPath) => (
            <div
              key={allPath}
              className={`flex justify-center items-center ${setBorderAndColor(
                allPath,
                players,
              )}`}
            >
              <div>{setIcon(allPath)}</div>
              {/* <div>{handleCancelPiece(allPath)}</div> */}

              {players?.map((player) =>
                player?.piece?.map((piece) =>
                  piece.position === allPath && piece.isHome ? (
                    <MapPin
                      size={20}
                      color={colorsMap[player.color]}
                      key={`${player.status}-${piece.id}`}
                      className={`cursor-pointer`}
                      onClick={() => handleToggle(player.status, piece.id)}
                    ></MapPin>
                  ) : !piece.isHome ? (
                    player?.path?.map((path, index) =>
                      path === allPath && index === piece.stepsMoved ? (
                        <MapPin
                          size={20}
                          color={colorsMap[player.color]}
                          key={`${player.status}-${piece.id}-${index}`}
                          className={`cursor-pointer`}
                          onClick={() =>
                            handleIncreacseStep(
                              player.status,
                              piece.id,
                              nextTurn,
                            )
                          }
                        ></MapPin>
                      ) : null,
                    )
                  ) : null,
                ),
              )}
              {/* {allPath} */}
            </div>
          ))}

          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <EndZone
              player1={player1}
              player2={player2}
              player3={player3}
              player4={player4}
            />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2">
            <div className="flex gap-45">
              <div className="flex justify-center items-center">
                <Dice myPlayer="P4" activePlayer={activePlayer} />
                <MapPin color={colorsMap[player4?.color]} />
              </div>

              <div className="flex justify-center items-center">
                <Dice myPlayer="P3" activePlayer={activePlayer} />
                <MapPin color={colorsMap[player3?.color]} />
              </div>
            </div>
          </div>
          <Modal
            title="Confirmation"
            content="Are you sure you want to Quit?"
            confirm={() => quitGame()}
            onClose={() => setIsOpenModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default LudoBoard;
