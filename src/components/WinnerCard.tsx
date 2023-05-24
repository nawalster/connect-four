import React from "react";
import { declareWinner } from "../reducers/gameSlice";
import { useSelector, useDispatch } from "react-redux";
import { closePauseMenu, playAgain } from "../reducers/gameSlice";
import { RootState } from "../store/store";
import { clearBoardDOM } from "../helpers/helpers";

const WinnerCard = () => {
  const dispatch = useDispatch();
  const winningPiece = useSelector(
    (state: RootState) => state.game.winningPiece
  );

  const handlePlayAgain = () => {
    dispatch(playAgain());
    clearBoardDOM();
  };
  return (
    <div className="winner-card">
      <div className="winner-card-text">
        <p className="winner-name">
          {winningPiece !== 0 ? `player ${winningPiece}` : "no one"}
        </p>
        <p className="winner-statement">wins</p>
        <button
          className="game-screen-btn play-again-btn"
          onClick={handlePlayAgain}
        >
          play again
        </button>
      </div>
    </div>
  );
};

export default WinnerCard;
