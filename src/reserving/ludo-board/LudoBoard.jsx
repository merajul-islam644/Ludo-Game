import ActivePlayerIndicator from "@/active-player-indicator/ActivePlayerIndicator";
import BoardCellPieces from "@/board-cell-pieces/BoardCellPieces";
// import CellPieceIndicator from "@/cell-piece-indicator/CellPieceIndicator";
import AppHint from "@/common/AppHint";
import { Button } from "@/components/ui/button";
import { endZone, path, safeZone } from "@/constant/boardPaths.constants";
import {
  colorsMap,
  setActiveHomePulse,
  setBorderAndColor,
  setIcon,
} from "@/constant/ui.constants";
import { gameContext } from "@/context/GameContextProvider";
import DiceOfPlayer1 from "@/dice/DiceOfPlayer1";
import DiceOfPlayer2 from "@/dice/DiceOfPlayer2";
import DiceOfPlayer3 from "@/dice/DiceOfPlayer3";
import DiceOfPlayer4 from "@/dice/DiceOfPlayer4";
import { EndZone } from "@/end-zone/EndZone";
import { Undo2 } from "lucide-react";
import { useContext } from "react";
import BoardPlayerLabels from "./BoardPlayerLabels";
import WinningStatus from "@/winner-status/WinningStatus";
import BackgroundMusic from "@/bg-music/BackgroundMusic";

const LudoBoard = () => {
  const {
    players,
    handleToggle,
    handleIncreacseStep,
    dispatch,
    isRoled,
    player1,
    player2,
    player3,
    player4,
    activePlayer,
    nextTurn,
    diceValue,
  } = useContext(gameContext);

  return (
    <div className="relative">
      {/* <BackgroundMusic /> */}
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center border-4 border-slate-800 h-screen bg-gray-700">
          <div className="absolute top-2 flex justify-center items-center">
            <Button
              onClick={() =>
                dispatch({
                  type: "OPEN_MODAL",
                  payload: "QUIT",
                })
              }
              className="
    cursor-pointer

    bg-linear-to-r
    from-[#ff6666]
    via-[#e60000]
    to-[#990000]

    hover:from-[#ff8080]
    hover:via-[#ff1a1a]
    hover:to-[#b30000]

    text-[#ffffff]
    font-bold

    px-6 py-2
    rounded-xl

    shadow-[0_6px_0_#5a0000]
    hover:shadow-[0_8px_0_#3b0000]
    active:shadow-[0_2px_0_#3b0000]

    border border-[#ffb3b3]/30

    transition-all duration-200

    hover:scale-100
    active:scale-95
  "
            >
              <div className="flex justify-center items-center gap-1">
                <span>Quit</span>
                <Undo2 size={25} strokeWidth={4} />
              </div>
            </Button>
          </div>

          <div>
            <div className="flex items-center justify-between pl-1 pr-1 pb-1 rounded-2xl ">
              {/* Player 1 Dice */}
              <div className="flex items-center gap-2">
                <DiceOfPlayer1 />
              </div>

              {/* Active Player Indicator (CENTER FOCUS) */}
              <div className="flex flex-col items-center justify-center">
                <ActivePlayerIndicator
                  activePlayer={activePlayer}
                  player1={player1}
                  player2={player2}
                />
              </div>

              {/* Player 2 Dice */}
              <div className="flex items-center gap-2">
                <DiceOfPlayer2 />
              </div>
            </div>

            {/* Main Board */}
            <div className="grid grid-cols-15 place-items-center bg-white">
              {/* Players Label */}
              <BoardPlayerLabels />

              {path.map((allPath) => {
                const isSafeZone = safeZone.includes(allPath);

                const showCircle = players.some((player) =>
                  player.piece?.some((p) => p.position === allPath),
                );

                const circleColor = players.find((player) =>
                  player.piece?.some((p) => p.position === allPath),
                )?.color;

                const boxUI = (
                  <div
                    className={[
                      "flex relative justify-center items-center",
                      setActiveHomePulse(allPath, players, activePlayer),
                      setBorderAndColor(allPath, players, activePlayer),
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {/* Icon */}
                    <div className="absolute">
                      {setIcon(allPath, player1, player2, player3, player4)}
                    </div>

                    {/* Home Pieces Tile Circle */}
                    <div>
                      {showCircle && (
                        <div
                          className={`absolute bottom-px right-0.5 border border-black h-6 w-6 rounded-full ${circleColor}`}
                        ></div>
                      )}
                    </div>

                    {/* PIECES */}
                    <BoardCellPieces
                      players={players}
                      activePlayer={activePlayer}
                      isRoled={isRoled}
                      allPath={allPath}
                      safeZone={safeZone}
                      endZone={endZone}
                      colorsMap={colorsMap}
                      handleToggle={handleToggle}
                      handleIncreacseStep={handleIncreacseStep}
                      nextTurn={nextTurn}
                    />
                    {/* {allPath} */}
                  </div>
                );

                return isSafeZone ? (
                  <AppHint
                    key={allPath}
                    position={allPath}
                    players={players}
                    activePlayer={activePlayer}
                    allPath={allPath}
                    diceValue={diceValue}
                  >
                    {boxUI}
                  </AppHint>
                ) : (
                  <div key={allPath}>{boxUI}</div>
                );
              })}

              {/* winning Status */}
              <WinningStatus />

              {/* EndZone */}
              <div className="absolute top-[49.6%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <EndZone
                  player1={player1}
                  player2={player2}
                  player3={player3}
                  player4={player4}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pl-1 pr-1 pb-1 rounded-2xl ">
              {/* Player 4 Dice (LEFT) */}
              <div className="flex items-center gap-2">
                <DiceOfPlayer4 />
              </div>

              {/* Active Player Indicator (CENTER) */}
              <div className="flex flex-col items-center justify-center">
                <ActivePlayerIndicator
                  activePlayer={activePlayer}
                  player3={player3}
                  player4={player4}
                />
              </div>

              {/* Player 3 Dice (RIGHT) */}
              <div className="flex items-center gap-2">
                <DiceOfPlayer3 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LudoBoard;
