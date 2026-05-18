import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colors } from "@/constant/ui.constants";
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
    <div
      className="
        relative flex items-center gap-3
        p-3 rounded-2xl
        bg-black/40 backdrop-blur-xl
        border border-cyan-400/10
        shadow-[0_0_25px_rgba(34,211,238,0.08)]
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 blur-xl pointer-events-none" />

      {/* Select */}
      <Select onValueChange={handleChangeColor} value={player.color || ""}>
        <SelectTrigger
          className="
            relative z-10
            w-full h-11

            rounded-xl
            border border-white/10
            bg-white/5

            text-white
            transition-all duration-300

            hover:border-cyan-400/40
            hover:bg-cyan-500/10

            focus:ring-0
            focus:border-cyan-400/60

            shadow-[0_0_12px_rgba(34,211,238,0.08)]
            hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]

            [&_svg]:text-cyan-300
            [&_svg]:size-4
          "
        >
          <SelectValue placeholder={player.status} />
        </SelectTrigger>

        <SelectContent
          className="
            border border-cyan-400/20
            bg-black/90 backdrop-blur-xl
            text-white
          "
        >
          {availableColors.map((item) => (
            <SelectItem
              key={item.id}
              value={item.value}
              className="
    cursor-pointer
    rounded-lg

    text-white
  "
            >
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${item.value} shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
                />
                <span>
                  {player.status.toUpperCase()} - {item.label}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Selected Color Preview */}
      <div
        className={`
          relative z-10
          h-5 w-5 rounded-xl
          border border-white/20
          ${player.color}

          shadow-[0_0_20px_rgba(255,255,255,0.35)]
          transition-all duration-300
        `}
      >
        <div className="absolute inset-0 rounded-xl bg-white/10 blur-[2px]" />
      </div>
    </div>
  );
}
