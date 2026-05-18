export const EndZone = ({ size = 85, player1, player2, player3, player4 }) => {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: size, height: size }}
    >
      {/* top left */}
      <div
        className={`absolute content-center inset-0 ${player1?.color}`}
        style={{ clipPath: "polygon(50% 50%, 0% 100%, 0% 0%)" }}
      />

      {/* top right */}
      <div
        className={`absolute inset-0 ${player2?.color}`}
        style={{ clipPath: "polygon(50% 50%, 0% 0%, 100% 0%)" }}
      />

      {/* bottom right */}
      <div
        className={`absolute inset-0 ${player3?.color}`}
        style={{ clipPath: "polygon(50% 50%, 100% 0%, 100% 100%)" }}
      />

      {/* bottom left */}
      <div
        className={`absolute inset-0 ${player4?.color}`}
        style={{ clipPath: "polygon(50% 50%, 100% 100%, 0% 100%)" }}
      />
    </div>
  );
};
