import { useRef } from "react";
import { Howl } from "howler";
import music from "../assets/bg-music.mp3";

export default function BackgroundMusic() {
  const musicRef = useRef(null);

  const playMusic = () => {
    if (!musicRef.current) {
      musicRef.current = new Howl({
        src: [music],
        loop: true,
        volume: 0.5,
      });
    }
    musicRef.current.play();
  };

  const pauseMusic = () => {
    musicRef.current?.pause();
  };

  return (
    <div>
      <button onClick={playMusic}>▶ Play</button>
      <button onClick={pauseMusic}>⏸ Pause</button>
    </div>
  );
}
