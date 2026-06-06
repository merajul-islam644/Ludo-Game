const DefaultHomeZone = ({ pieces, position, color }) => {
  return (
    <div
      className={`flex justify-center items-center h-42 w-42 absolute z-50 ${position}`}
    >
      <div className="grid grid-cols-2 gap-x-11 gap-y-4">
        {pieces.map((piece) => (
          <div
            key={piece.id}
            className="relative flex items-center justify-center"
          >
            <div
              className={`border border-black rounded-full h-7 w-7 ${color}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default DefaultHomeZone;