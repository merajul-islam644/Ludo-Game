import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";

// 🔥 Desktop / Mobile fallback UI
const DesktopBox = () => (
  <div className="grid grid-cols-2 gap-1 w-20 h-20">
    <div className="bg-white/10 rounded-sm" />
    <div className="bg-white/10 rounded-sm" />
    <div className="bg-white/10 rounded-sm" />
    <div className="bg-white/10 rounded-sm" />
  </div>
);

const MobileBox = () => (
  <div
    className="
      w-40
      p-3
      rounded-2xl
      bg-black/70
      border border-cyan-400/20
      backdrop-blur-xl
      shadow-[0_0_25px_rgba(34,211,238,0.2)]
    "
  >
    {/* Title */}
    <div className="text-center text-xs text-cyan-300 mb-2 font-semibold">
      Move Options
    </div>

    {/* Grid */}
    <div className="grid grid-cols-2 gap-2">
      <div className="h-14 bg-white/10 rounded-lg flex items-center justify-center text-white/70 text-sm">
        1
      </div>
      <div className="h-14 bg-white/10 rounded-lg flex items-center justify-center text-white/70 text-sm">
        2
      </div>
      <div className="h-14 bg-white/10 rounded-lg flex items-center justify-center text-white/70 text-sm">
        3
      </div>
      <div className="h-14 bg-white/10 rounded-lg flex items-center justify-center text-white/70 text-sm">
        4
      </div>
    </div>
  </div>
);

const AppHint = ({
  children,
  side = "top",
  className = "",
  mobileContent,
  desktopContent,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const content =
    mobileContent ||
    desktopContent ||
    (isMobile ? <MobileBox /> : <DesktopBox />);

  // 🔥 MOBILE → POPOVER
  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>

        <PopoverContent
          className={`
            bg-transparent border-none shadow-none p-0
            ${className}
          `}
        >
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  // 🔥 DESKTOP → TOOLTIP
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent
          side={side}
          className={`
            bg-black/80
            text-white
            border border-cyan-400/20
            backdrop-blur-xl
            p-2
            rounded-md
            shadow-[0_0_15px_rgba(34,211,238,0.2)]
            ${className}
          `}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AppHint;
