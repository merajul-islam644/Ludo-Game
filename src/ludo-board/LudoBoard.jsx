import AppHint from "@/common/AppHint";
import { Button } from "@/components/ui/button";
import {
  colorsMap,
  path,
  setActiveHomePulse,
  setBorderAndColor,
  setIcon,
} from "@/constant/constant";
import { gameContext } from "@/constext/GameContext";
import Dice from "@/dice/Dice";
import { MapPin } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";

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
  const [currentPlayer, setCurrentPlayer] = useState(
    () => JSON.parse(localStorage.getItem("currentPlayer")) || 0,
  );

  useEffect(() => {
    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
  }, [currentPlayer]);

  const {
    players,
    handleToggle,
    handleIncreacseStep,
    setIsOpenModal,
    setModalType,
    isRoled,
  } = useContext(gameContext);

  const player1 = players?.find((p) => p.status === "player-1");
  const player2 = players?.find((p) => p.status === "player-2");
  const player3 = players?.find((p) => p.status === "player-3");
  const player4 = players?.find((p) => p.status === "player-4");

  const playersArray = [
    player1?.status,
    player2?.status,
    player3?.status,
    player4?.status,
  ];

  const activePlayer = playersArray[currentPlayer];

  const nextTurn = useCallback(() => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  }, [players.length]);

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div>
          <div className="flex justify-center items-center">
            <Button
              onClick={() => {
                (setModalType("Quite"), setIsOpenModal(true));
              }}
              variant="destructive"
              className="cursor-pointer"
            >
              Quit
            </Button>
          </div>
          <div className="flex justify-between items-center">
            {/* Player 1 */}
            <div
              className={`flex items-center gap-3 ${activePlayer === player1.status && "animate-pulse"}`}
            >
              <div
                className={`p-2 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300`}
                style={{
                  boxShadow: `0 0 15px ${colorsMap[player1?.color]}`,
                  border: `1px solid ${colorsMap[player1?.color]}`,
                }}
              >
                <Dice
                  myPlayer={player1?.status}
                  activePlayer={activePlayer}
                  nextTurn={nextTurn}
                />
              </div>

              <div className="flex flex-col gap-3 items-center">
                <div
                  className={`p-2 rounded-full`}
                  style={{
                    boxShadow: `0 0 12px ${colorsMap[player1?.color]}`,
                  }}
                >
                  <MapPin color={colorsMap[player1?.color]} />
                </div>
                <span className="text-xs font-semibold tracking-wide">
                  Player-1
                </span>
              </div>
            </div>

            {/* Player 3 */}
            <div
              className={`flex items-center gap-3 ${activePlayer === player2?.status && "animate-pulse"}`}
            >
              <div className="flex flex-col gap-3 items-center">
                <div
                  className={`p-2 rounded-full`}
                  style={{
                    boxShadow: `0 0 12px ${colorsMap[player2?.color]}`,
                  }}
                >
                  <MapPin color={colorsMap[player2?.color]} />
                </div>
                <span className="text-xs font-semibold tracking-wide">
                  Player-2
                </span>
              </div>

              <div
                className={`p-2 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 ${activePlayer === player2?.status && "animate-pulse"}`}
                style={{
                  boxShadow: `0 0 15px ${colorsMap[player2?.color]}`,
                  border: `1px solid ${colorsMap[player2?.color]}`,
                }}
              >
                <Dice
                  myPlayer={player2?.status}
                  activePlayer={activePlayer}
                  nextTurn={nextTurn}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-15 place-items-center relative my-1">
            {path.map((allPath) => (
              <div
                key={allPath}
                className={`flex justify-center items-center ${setActiveHomePulse(allPath, players, activePlayer)} ${setBorderAndColor(
                  allPath,
                  players,
                  activePlayer,
                )}`}
                // onMouseOver={() => console.log(allPath)}
              >
                <div>{setIcon(allPath)}</div>

                {players?.map((player) =>
                  player?.piece?.map((piece) =>
                    piece.position === allPath && piece.isHome ? (
                      <MapPin
                        size={20}
                        color={colorsMap[player.color]}
                        key={`${player.status}-${piece.id}`}
                        className={`cursor-pointer`}
                        onClick={() => {
                          if (activePlayer === player.status && isRoled) {
                            handleToggle(player.status, piece.id);
                          }
                        }}
                      ></MapPin>
                    ) : !piece.isHome ? (
                      player?.path?.map((path, index) =>
                        path === allPath && index === piece.stepsMoved ? (
                          <AppHint
                            key={`${player.status}-${piece.id}-${index}`}
                            text="Move Piece"
                          >
                            <MapPin
                              size={20}
                              color={colorsMap[player.color]}
                              className="cursor-pointer"
                              onClick={() => {
                                if (activePlayer === player.status && isRoled) {
                                  handleIncreacseStep(
                                    player.status,
                                    piece.id,
                                    nextTurn,
                                  );
                                }
                              }}
                            />
                          </AppHint>
                        ) : null,
                      )
                    ) : null,
                  ),
                )}
                {/* {allPath}, */}
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
          </div>
          <div className="flex justify-between items-center">
            {/* Player 4 */}
            <div
              className={`flex items-center gap-3 ${activePlayer === player4?.status && "animate-pulse"}`}
            >
              <div
                className="p-2 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300"
                style={{
                  boxShadow: `0 0 15px ${colorsMap[player4?.color]}`,
                  border: `1px solid ${colorsMap[player4?.color]}`,
                }}
              >
                <Dice
                  myPlayer={player4?.status}
                  activePlayer={activePlayer}
                  nextTurn={nextTurn}
                />
              </div>

              <div className="flex flex-col gap-3 items-center">
                <span className="text-xs font-semibold tracking-wide ">
                  Player-4
                </span>

                <div
                  className="p-2 rounded-full"
                  style={{
                    boxShadow: `0 0 12px ${colorsMap[player4?.color]}`,
                  }}
                >
                  <MapPin color={colorsMap[player4?.color]} />
                </div>
              </div>
            </div>

            {/* Player 3 */}
            <div
              className={`flex items-center gap-3 ${activePlayer === player3.status && "animate-pulse"}`}
            >
              <div className="flex flex-col gap-3 items-center">
                <span className="text-xs font-semibold tracking-wide">
                  {players.length === 2 ? "Player-2" : "Player-3"}
                </span>

                <div
                  className="p-2 rounded-full"
                  style={{
                    boxShadow: `0 0 12px ${colorsMap[player3?.color]}`,
                  }}
                >
                  <MapPin color={colorsMap[player3?.color]} />
                </div>
              </div>

              <div
                className="p-2 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300"
                style={{
                  boxShadow: `0 0 15px ${colorsMap[player3?.color]}`,
                  border: `1px solid ${colorsMap[player3?.color]}`,
                }}
              >
                <Dice
                  myPlayer={player3?.status}
                  activePlayer={activePlayer}
                  nextTurn={nextTurn}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LudoBoard;
