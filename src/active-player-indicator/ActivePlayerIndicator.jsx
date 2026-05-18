const ActivePlayerIndicator = ({
  activePlayer,
  player1,
  player2,
  player3,
  player4,
}) => {
  const isLeft =
    activePlayer === player1?.status || activePlayer === player4?.status;

  const isRight =
    activePlayer === player2?.status || activePlayer === player3?.status;

  return (
    <div className="flex justify-center items-center">
      {isLeft && (
        <div className="text-3xl animate-[bounceX_0.3s_infinite]">👈</div>
      )}

      {isRight && (
        <div className="text-3xl animate-[bounceX_0.3s_infinite]">👉</div>
      )}
    </div>
  );
};

export default ActivePlayerIndicator;
