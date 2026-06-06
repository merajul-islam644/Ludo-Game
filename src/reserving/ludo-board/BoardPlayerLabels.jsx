const BoardPlayerLabels = () => {
  return (
    <div className="absolute">
      <span className="absolute z-10 -left-40 -top-17 font-bold">Player-1</span>
      <span className="absolute z-10 -right-40 -top-17 font-bold">
        Player-2
      </span>
      <span className="absolute z-10 -right-40 -bottom-17 font-bold">
        Player-3
      </span>
      <span className="absolute z-10 -left-40 -bottom-17 font-bold">
        Player-4
      </span>
    </div>
  );
};

export default BoardPlayerLabels;
