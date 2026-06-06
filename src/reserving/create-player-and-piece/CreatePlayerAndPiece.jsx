import { useCallback, useContext, useEffect } from "react";
import {
  colorClasses,
  homeObject,
  pathObject,
  pieceStartPositionArray,
} from "../constants/constants";
import { gameContext } from "../context/GameContextProvider";

const CreatePlayerAndPiece = () => {
  const {
    selectedPlayers,
    setSelectedPlayers,
    selectedPieces,
    setSelectedPieces,
    players,
    setPlayers,
    nextTurn,
  } = useContext(gameContext);

  // Create Pieces
  const createPieces = useCallback(() => {
    const pieces = [];
    for (let i = 0; i < selectedPieces; i++) {
      pieces.push({
        id: i + 1,
        isHome: true,
        currentPosition: 0,
        stepsMoved: 0,
      });
    }
    return pieces;
  }, [selectedPieces]);

  // Create Players
  const createPlayers = useCallback(() => {
    const players = [];
    for (let i = 0; i < selectedPlayers; i++) {
      players.push({
        id: i + 1,
        status: `Player-${i + 1}`,
        color:
          selectedPlayers === 2 && i === 1
            ? colorClasses[i + 2]
            : colorClasses[i + 1],
        pieces: createPieces(pieceStartPositionArray[i]),
        homeArea:
          selectedPlayers === 2 && i === 1
            ? homeObject[i + 2]
            : homeObject[i + 1],
        path:
          selectedPlayers === 2 && i === 1
            ? pathObject[i + 2]
            : pathObject[i + 1],
      });
    }
    setPlayers(players);
  }, [selectedPlayers, createPieces, setPlayers]);

  // Players Persisting In The Local Storage
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <div className="flex gap-2 mt-20">
        <button
          onClick={() => setSelectedPlayers(2)}
          className="border border-black rounded bg-amber-200 hover:bg-amber-300 px-4 py-2 cursor-pointer"
        >
          2-Player
        </button>
        <button
          onClick={() => setSelectedPlayers(2)}
          className="border border-black rounded bg-amber-200 hover:bg-amber-300 px-4 py-2 cursor-pointer"
        >
          3-Player
        </button>
        <button
          onClick={() => setSelectedPlayers(4)}
          className="border border-black rounded bg-cyan-200 hover:bg-cyan-300 px-4 py-2 cursor-pointer"
        >
          4-Player
        </button>
        <button
          onClick={() => setSelectedPlayers(4)}
          className="border border-black rounded bg-cyan-200 hover:bg-cyan-300 px-4 py-2 cursor-pointer"
        >
          5-Player
        </button>
        <button
          onClick={() => setSelectedPlayers(6)}
          className="border border-black rounded bg-blue-200 hover:bg-blue-300 px-4 py-2 cursor-pointer"
        >
          6-Player
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedPieces(1)}
          className="border border-black rounded bg-blue-200 hover:bg-blue-300 px-4 py-2 cursor-pointer"
        >
          1-Pieces
        </button>
        <button
          onClick={() => setSelectedPieces(2)}
          className="border border-black rounded bg-red-200 hover:bg-red-300 px-4 py-2 cursor-pointer"
        >
          2-Pieces
        </button>
        <button
          onClick={() => setSelectedPieces(3)}
          className="border border-black rounded bg-red-200 hover:bg-red-300 px-4 py-2 cursor-pointer"
        >
          3-Pieces
        </button>
        <button
          onClick={() => setSelectedPieces(4)}
          className="border border-black rounded bg-yellow-200 hover:bg-yellow-300 px-4 py-2 cursor-pointer"
        >
          4-Pieces
        </button>
        <button
          onClick={() => setSelectedPieces(5)}
          className="border border-black rounded bg-yellow-200 hover:bg-yellow-300 px-4 py-2 cursor-pointer"
        >
          5-Pieces
        </button>
        <button
          onClick={() => setSelectedPieces(6)}
          className="border border-black rounded bg-pink-200 hover:bg-pink-300 px-4 py-2 cursor-pointer"
        >
          6-Pieces
        </button>
      </div>
      <div>
        <button
          onClick={() => createPlayers()}
          className="border border-black rounded bg-green-200 hover:bg-green-300 px-4 py-2 cursor-pointer mb-1"
        >
          Save
        </button>
        <button
          onClick={() => nextTurn()}
          className="border ml-2 border-black rounded bg-green-200 hover:bg-green-300 px-4 py-2 cursor-pointer mb-1"
        >
          Next Turn
        </button>
      </div>
    </div>
  );
};

export default CreatePlayerAndPiece;
