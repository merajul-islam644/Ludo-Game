import AppHint from "@/common/AppHint";
import { Button } from "@/components/ui/button";
import {
  colorsMap,
  destination,
  endZone,
  path,
  safeZone,
  setActiveHomePulse,
  setBorderAndColor,
  setIcon,
} from "@/constant/constant";
import { gameContext } from "@/constext/GameContext";
import Dice from "@/dice/Dice";
import { Loader, MapPin } from "lucide-react";
import { useContext } from "react";

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
      />

      {/* top right */}
      <div
        className={`absolute inset-0 ${player2?.color}`}
        style={{ clipPath: "polygon(50% 50%, 0% 0%, 100% 0%)" }}
      />

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
  const {
    players,
    handleToggle,
    handleIncreacseStep,
    setIsOpenModal,
    setModalType,
    isRoled,
    player1,
    player2,
    player3,
    player4,
    activePlayer,
    nextTurn,
  } = useContext(gameContext);

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
              className={`flex items-center gap-3 ${activePlayer === player1.status && "animate-[pulse_0.5s_infinite]"}`}
            >
              <div
                className={`p-2 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300`}
                style={{
                  boxShadow: `0 0 15px ${colorsMap[player1?.color]}`,
                  border: `1px solid ${colorsMap[player1?.color]}`,
                }}
              >
                <Dice playerStatus={player1.status} />
              </div>

              <div className="flex flex-col gap-3 items-center">
                <div
                  className={`p-2 rounded-full relative`}
                  style={{
                    boxShadow: `0 0 12px ${colorsMap[player1?.color]}`,
                  }}
                >
                  <MapPin
                    size={35}
                    color="white"
                    fill="white"
                    className="cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
                    style={{
                      transform: "scale(0.9, 1)",
                    }}
                  />
                  <div
                    className="absolute top-3 left-4 w-5 h-5 rounded-full border border-slate-500 cursor-pointer"
                    style={{ backgroundColor: colorsMap[player1.color] }}
                  />
                </div>
                <span className="text-xs font-semibold tracking-wide">
                  Player-1
                </span>
              </div>
            </div>

            <div className="flex justify-center items-center">
              {activePlayer === player1.status && (
                <div className="text-3xl animate-[bounceX_0.3s_infinite]">
                  👈
                </div>
              )}

              {activePlayer === player2?.status && (
                <div className="text-3xl animate-[bounceX_0.3s_infinite]">
                  👉
                </div>
              )}
            </div>

            {/* Player 2 */}
            <div
              className={`flex items-center gap-3 ${activePlayer === player2?.status && "animate-[pulse_0.5s_infinite]"}`}
            >
              <div className="flex flex-col gap-3 items-center">
                <div
                  className={`p-2 rounded-full relative`}
                  style={{
                    boxShadow: `0 0 12px ${colorsMap[player2?.color]}`,
                  }}
                >
                  <MapPin
                    size={35}
                    color="white"
                    fill="white"
                    className="cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
                    style={{
                      transform: "scale(0.9, 1)",
                    }}
                  />
                  <div
                    className="absolute top-3 left-4 w-5 h-5 rounded-full border border-slate-500 cursor-pointer"
                    style={{ backgroundColor: colorsMap[player2?.color] }}
                  />
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
                <Dice playerStatus={player2?.status} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-15 place-items-center relative my-1">
            {path.map((allPath) => {
              const isSafeZone = safeZone.includes(allPath);

              const boxUI = (
                <div
                  className={`flex relative justify-center items-center ${setActiveHomePulse(
                    allPath,
                    players,
                    activePlayer,
                  )} ${setBorderAndColor(allPath, players, activePlayer)}`}
                >
                  <div>
                    {players
                      .find((player) => player.status === activePlayer)
                      .piece.some(
                        (p) =>
                          p.currentPosition === allPath ||
                          p.position === allPath,
                      ) &&
                      isRoled && <Loader className="animate-spin" />}
                  </div>
                  {players.some((player) =>
                    player.piece.some(
                      (p) =>
                        p.currentPosition === allPath || p.position === allPath,
                    ),
                  ) && (
                    <div
                      className={`border-3 border-slate-500 h-5 w-5 rounded-full bg-white ${isRoled && "hidden"}`}
                    />
                  )}
                  <div className="absolute insert-0 -z-10">
                    {setIcon(allPath, player1, player2, player3, player4)}
                  </div>
                  {/* PIECES */}
                  {players?.map((player) =>
                    player?.piece?.map((piece, index) =>
                      piece.position === allPath && piece.isHome ? (
                        <div
                          key={`${player.status}-${piece.id}-${index}`}
                          onClick={() => {
                            if (activePlayer === player.status && isRoled) {
                              handleToggle(player.status, piece.id, allPath);
                            }
                          }}
                          className="absolute z-10 right-0.5 -top-4.5 w-[30px] h-[30px]"
                        >
                          <MapPin
                            size={35}
                            color="white"
                            fill="white"
                            className="cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
                            style={{
                              transform: "scale(0.9, 1)",
                            }}
                          />

                          <div
                            className="absolute top-[2px] left-[7.5px] w-5 h-5 rounded-full border border-slate-500 cursor-pointer"
                            style={{ backgroundColor: colorsMap[player.color] }}
                          />
                        </div>
                      ) : !piece.isHome ? (
                        player?.path?.map((p, index) =>
                          p === allPath && index === piece.stepsMoved ? (
                            <div
                              key={`${player.status}-${piece.id}-${index}`}
                              onClick={() => {
                                if (
                                  activePlayer === player.status &&
                                  isRoled &&
                                  !safeZone.includes(p) &&
                                  !endZone.includes(p)
                                ) {
                                  handleIncreacseStep(
                                    player.status,
                                    piece.id,
                                    nextTurn,
                                  );
                                }
                              }}
                              className="absolute z-10 right-0.5 -top-4.5 w-[30px] h-[30px] cursor-pointer"
                            >
                              <MapPin
                                size={35}
                                color="white"
                                fill="white"
                                className="cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
                                style={{
                                  transform: "scale(0.9, 1)",
                                }}
                              />
                              <div
                                className="absolute top-[2px] left-[7.5px] w-5 h-5 rounded-full border border-slate-500"
                                style={{
                                  backgroundColor: colorsMap[player.color],
                                }}
                              />
                            </div>
                          ) : null,
                        )
                      ) : null,
                    ),
                  )}
                  {/* {allPath}, */}
                </div>
              );

              return isSafeZone ? (
                <AppHint key={allPath} position={allPath}>
                  {boxUI}
                </AppHint>
              ) : (
                <div key={allPath}>{boxUI}</div>
              );
            })}

            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-50">
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
              className={`flex items-center gap-3 ${activePlayer === player4?.status && "animate-[pulse_0.5s_infinite]"}`}
            >
              <div
                className="p-2 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300"
                style={{
                  boxShadow: `0 0 15px ${colorsMap[player4?.color]}`,
                  border: `1px solid ${colorsMap[player4?.color]}`,
                }}
              >
                <Dice playerStatus={player4?.status} />
              </div>

              <div className="flex flex-col gap-3 items-center">
                <span className="text-xs font-semibold tracking-wide ">
                  Player-4
                </span>

                <div
                  className="p-2 rounded-full relative"
                  style={{
                    boxShadow: `0 0 12px ${colorsMap[player4?.color]}`,
                  }}
                >
                  <MapPin
                    size={35}
                    color="white"
                    fill="white"
                    className="cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
                    style={{
                      transform: "scale(0.9, 1)",
                    }}
                  />
                  <div
                    className="absolute top-3 left-4 w-5 h-5 rounded-full border border-slate-500 cursor-pointer"
                    style={{ backgroundColor: colorsMap[player4?.color] }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              {activePlayer === player4?.status && (
                <div className="text-3xl animate-[bounceX_0.3s_infinite]">
                  👈
                </div>
              )}

              {activePlayer === player3.status && (
                <div className="text-3xl animate-[bounceX_0.3s_infinite]">
                  👉
                </div>
              )}
            </div>

            {/* Player 3 */}
            <div
              className={`flex items-center gap-3 ${activePlayer === player3.status && "animate-[pulse_0.5s_infinite]"}`}
            >
              <div className="flex flex-col gap-3 items-center">
                <span className="text-xs font-semibold tracking-wide">
                  {players.length === 2 ? "Player-2" : "Player-3"}
                </span>

                <div
                  className="p-2 rounded-full relative"
                  style={{
                    boxShadow: `0 0 12px ${colorsMap[player3?.color]}`,
                  }}
                >
                  <MapPin
                    size={35}
                    color="white"
                    fill="white"
                    className="cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,2)]"
                    style={{
                      transform: "scale(0.9, 1)",
                    }}
                  />
                  <div
                    className="absolute top-3 left-4 w-5 h-5 rounded-full border border-slate-500 cursor-pointer"
                    style={{ backgroundColor: colorsMap[player3.color] }}
                  />
                </div>
              </div>

              <div
                className="p-2 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300"
                style={{
                  boxShadow: `0 0 15px ${colorsMap[player3?.color]}`,
                  border: `1px solid ${colorsMap[player3?.color]}`,
                }}
              >
                <Dice playerStatus={player3.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LudoBoard;
