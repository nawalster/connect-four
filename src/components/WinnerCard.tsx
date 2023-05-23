import React from "react";
import { startNewGame, declareWinner } from "../reducers/gameSlice";

const WinnerCard = () => {
  const handleStartNewGame = () => {
    // startNewGame
  };
  return (
    <div className="winner-card">
      <div className="winner-card-text">
        <p className="winner-name">player 2</p>
        <p className="winner-statement">wins</p>
        <button
          className="game-screen-btn play-again-btn"
          // onClick={handleStartNewGame}
        >
          play again
        </button>
      </div>
    </div>
  );
};

export default WinnerCard;
