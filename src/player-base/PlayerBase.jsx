const PlayerBase = ({ position, playerStatus }) => {
  return (
    <div className={`absolute ${position}`}>
      <div className="px-3 py-1 rounded-full bg-slate-800/90 border border-slate-600 shadow-lg backdrop-blur-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-white">
          {playerStatus}
        </p>
      </div>
    </div>
  );
};

export default PlayerBase;