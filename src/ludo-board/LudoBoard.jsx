import {
  activePlayersIndicatorsPosition,
  endZonesPiecesPosition,
  piecePositionOfHome,
  playersBasePosition,
  safeZonesPiecesPosition,
} from "../constants/constants";
import { useContext } from "react";
import { gameContext } from "../context/GameContextProvider";
import DefaultHomeZone from "../default-home-zone/DefaultHomeZone";
import DiceBox from "../dice-box/DiceBox";
import ActivePlayersIndicator from "../active-players-indicator/ActivePlayersIndicator";
import GridBoard from "@/grid-board/GridBoard";
import HomeZone from "@/home-zone/HomeZone";
import EndZone from "@/end-zone/EndZone";
import PlayerBase from "@/player-base/PlayerBase";
import EndZonePiecesPositionComponent from "@/endZone-pieces-position-component/EndZonePiecesPositionComponent";
import SafeZonePiecesPositionComponent from "@/safezone-pieces-position-component/SafeZonePiecesPositionComponent";
import Winner from "@/winner/Winner";

const LudoBoard = () => {
  const { players, dispatch } = useContext(gameContext);
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen bg-slate-700">
      <div className="flex justify-center items-center h-screen bg-black border-4 border-amber-400 px-1">
        <div className="relative py-16">
          <div className="absolute z-50 left-44 -top-15">
            <button
              onClick={() =>
                dispatch({
                  type: "OPEN_MODAL",
                  payload: "QUIT",
                })
              }
              className="bg-red-500 px-1 pt-1 pb-0.5 rounded font-bold text-white"
            >
              QUITE
            </button>
          </div>

          <div className="flex justify-center items-center relative bg-white">
            <div>
              <GridBoard players={players} />
            </div>

            <div>
              {players.map((player) => {
                return (
                  <HomeZone
                    key={player.id}
                    position={
                      piecePositionOfHome[
                        players.length === 2 && player.id === 2
                          ? player.id
                          : player.id - 1
                      ]?.position
                    }
                    color={player.color}
                    pieces={player.pieces}
                    playerId={player.id}
                  />
                );
              })}
            </div>

            {players.length === 2 && (
              <div>
                <DefaultHomeZone
                  color={"bg-green-500"}
                  position={"top-0 right-0"}
                  pieces={players[0].pieces}
                />
                <DefaultHomeZone
                  color={"bg-cyan-500"}
                  position={"bottom-0 left-0"}
                  pieces={players[0].pieces}
                />
              </div>
            )}

            <div className="absolute">
              <EndZone />
            </div>

            <div>
              {players.map((player) => (
                <Winner key={player.id} player={player} />
              ))}
            </div>

            <div>
              {players.map((player) => (
                <PlayerBase
                  key={player.id}
                  position={
                    playersBasePosition[
                      players.length === 2 && player.id === 2
                        ? player.id + 1
                        : player.id
                    ]
                  }
                  playerStatus={player.status}
                />
              ))}
            </div>

            <div>
              {players.map((player) => (
                <EndZonePiecesPositionComponent
                  key={player.id}
                  position={endZonesPiecesPosition[player.id - 1].position}
                  endZoneNumber={
                    endZonesPiecesPosition[player.id - 1].endZoneNumber
                  }
                />
              ))}
            </div>

            <div>
              {players.map((player) => (
                <SafeZonePiecesPositionComponent
                  key={player.id}
                  position={safeZonesPiecesPosition[player.id - 1].position}
                  safeZoneNumber={
                    safeZonesPiecesPosition[player.id - 1].safeZoneNumber
                  }
                />
              ))}
            </div>
          </div>

          <div>
            {players.map((player) => (
              <DiceBox
                key={player.id}
                player={player}
                position={
                  piecePositionOfHome[
                    players.length === 2 && player.id === 2
                      ? player.id
                      : player.id - 1
                  ]?.position
                }
                side={piecePositionOfHome[player.id - 1]?.side}
              />
            ))}
          </div>

          <div>
            {players.map((player) => (
              <ActivePlayersIndicator
                key={player.id}
                icon={activePlayersIndicatorsPosition[player.id - 1].icon}
                position={
                  activePlayersIndicatorsPosition[
                    players.length === 2 && player.id === 2
                      ? player.id
                      : player.id - 1
                  ].position
                }
                playerId={player.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LudoBoard;
