import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gameContext } from "@/constext/GameContext";
import { useContext } from "react";

function SelectPlayer() {
  const { handleSetPlayers, error } = useContext(gameContext);

  return (
    <div>
      <Select onValueChange={handleSetPlayers}>
        <SelectTrigger className="w-full rounded">
          <SelectValue placeholder="Select Player" />
        </SelectTrigger>

        <SelectContent className="rounded">
          <SelectItem value="2">2-Player</SelectItem>
          <SelectItem value="4">4-Player</SelectItem>
        </SelectContent>
      </Select>

      <p className="text-sm text-red-500 mt-1">{error.playerSelectionError}</p>
    </div>
  );
}

export default SelectPlayer;
