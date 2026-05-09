import { useContext } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { gameContext } from "@/constext/GameContext";
import {
  pieceOfHome1,
  pieceOfHome2,
  pieceOfHome3,
  pieceOfHome4,
} from "@/constant/constant";

const createPieces = (count, startPositions) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    position: startPositions[i] ?? null,
    isActive: false,
    isHome: true,
    stepsMoved: 0,
  }));
};

const homeMap = {
  "player-1": pieceOfHome1,
  "player-2": pieceOfHome2,
  "player-3": pieceOfHome3,
  "player-4": pieceOfHome4,
};

const SelectPiece = () => {
  const { players, setPlayers, error } = useContext(gameContext);

  const handlePieceChange = (value) => {
    const count = Number(value);

    const updatedPlayers = players.map((player) => {
      const actualPosition = homeMap[player.status] || [];

      return {
        ...player,
        piece: createPieces(count, actualPosition),
      };
    });

    setPlayers(updatedPlayers);
  };

  return (
    <div>
      <Select onValueChange={handlePieceChange}>
        <SelectTrigger className="w-full rounded">
          <SelectValue placeholder="Select Piece" />
        </SelectTrigger>

        <SelectContent className="rounded">
          <SelectItem value="2">2-Piece</SelectItem>
          <SelectItem value="4">4-Piece</SelectItem>
          <SelectItem value="6">6-Piece</SelectItem>
          <SelectItem value="8">8-Piece</SelectItem>
        </SelectContent>
      </Select>

      <p className="text-sm text-red-500 mt-1">{error.pieceSelectionError}</p>
    </div>
  );
};

export default SelectPiece;
