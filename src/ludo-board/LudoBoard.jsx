import ActivePlayerIndicator from "@/active-player-indicator/ActivePlayerIndicator";
import BoardCellPieces from "@/board-cell-pieces/BoardCellPieces";
import CellPieceIndicator from "@/cell-piece-indicator/CellPieceIndicator";
import AppHint from "@/common/AppHint";
import { Button } from "@/components/ui/button";
import { endZone, path, safeZone } from "@/constant/boardPaths.constants";
import {
  colorsMap,
  setActiveHomePulse,
  setBorderAndColor,
  setIcon,
} from "@/constant/ui.constants";
import { gameContext } from "@/constext/GameContext";
import DiceOfPlayer1 from "@/dice/DiceOfPlayer1";
import DiceOfPlayer2 from "@/dice/DiceOfPlayer2";
import DiceOfPlayer3 from "@/dice/DiceOfPlayer3";
import DiceOfPlayer4 from "@/dice/DiceOfPlayer4";
import { EndZone } from "@/end-zone/EndZone";
import { useContext } from "react";

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
            <DiceOfPlayer1 />

            {/* Active Player Indicator */}
            <ActivePlayerIndicator
              activePlayer={activePlayer}
              player1={player1}
              player2={player2}
            />

            {/* Player 2 */}
            <DiceOfPlayer2 />
          </div>

          {/* Main Board */}
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
                  <CellPieceIndicator
                    players={players}
                    activePlayer={activePlayer}
                    isRoled={isRoled}
                    allPath={allPath}
                  />

                  <div className="absolute insert-0 -z-10">
                    {setIcon(allPath, player1, player2, player3, player4)}
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
                <AppHint key={allPath} position={allPath}>
                  {boxUI}
                </AppHint>
              ) : (
                <div key={allPath}>{boxUI}</div>
              );
            })}

            {/* EndZone */}
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
            <DiceOfPlayer4 />

            {/* Indicator */}
            <ActivePlayerIndicator
              activePlayer={activePlayer}
              player3={player3}
              player4={player4}
            />

            {/* Player 3 */}
            <DiceOfPlayer3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LudoBoard;
