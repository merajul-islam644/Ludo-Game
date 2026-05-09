import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colors } from "@/constant/constant";
import { gameContext } from "@/constext/GameContext";
import { useContext } from "react";

export function SelectColor({ player }) {
  const { setPlayers, players } = useContext(gameContext);

  const handleChangeColor = (value) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === player.id ? { ...p, color: value } : p)),
    );
  };

  const takenColors = players
    .filter((p) => p.id !== player.id)
    .map((p) => p.color)
    .filter(Boolean);

  const availableColors = colors.filter((c) => !takenColors.includes(c.value));

  return (
    <div className="flex gap-2 items-center">
      <Select onValueChange={handleChangeColor} value={player.color || ""}>
        <SelectTrigger className="w-full rounded">
          <SelectValue placeholder={player.status} />
        </SelectTrigger>

        <SelectContent>
          {availableColors.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              {player.status} - {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className={`h-5 w-5 rounded ${player.color}`} />
    </div>
  );
}
