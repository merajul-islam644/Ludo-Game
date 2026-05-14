import { Label } from "@/components/ui/label";
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
  const { handleSetPlayers } = useContext(gameContext);

  return (
    <div>
      <Select onValueChange={handleSetPlayers}>
        <SelectTrigger className="w-full rounded-lg py-5 bg-teal-500 [&_svg]:text-white [&_svg]:size-6">
          <SelectValue />
          <Label className="text-white text-2xl font-bold">Select Player</Label>
        </SelectTrigger>

        <SelectContent className="rounded w-full">
          <SelectItem value="2">2-Player</SelectItem>
          <SelectItem value="4">4-Player</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectPlayer;
