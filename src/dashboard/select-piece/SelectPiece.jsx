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
import { Label } from "@/components/ui/label";

const createPieces = (count, startPositions) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    position: startPositions[i] ?? null,
    isActive: false,
    isHome: true,
    stepsMoved: 0,
    currentPosition : null
  }));
};

const homeMap = {
  "player-1": pieceOfHome1,
  "player-2": pieceOfHome2,
  "player-3": pieceOfHome3,
  "player-4": pieceOfHome4,
};

const SelectPiece = () => {
  const { players, setPlayers } = useContext(gameContext);

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
        <SelectTrigger className="w-full rounded-lg py-5 bg-pink-500 [&_svg]:text-white [&_svg]:size-6">
          <SelectValue />
          <Label className="text-white text-2xl font-bold">Select Piece</Label>
        </SelectTrigger>

        <SelectContent className="rounded w-full">
          <SelectItem value="2">2-Piece</SelectItem>
          <SelectItem value="4">4-Piece</SelectItem>
          <SelectItem value="6">6-Piece</SelectItem>
          <SelectItem value="8">8-Piece</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPiece;
