import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const RedTimer = () => {
  const isWinnerDeclared = useSelector(
    (state: RootState) => state.game.isWinnerDeclared
  );
  const isComputerPlaying = useSelector(
    (state: RootState) => state.game.isComputerPlaying
  );
  const timePerMove = useSelector((state: RootState) => state.game.timePerMove);

  return (
    <div
      className={`${
        isWinnerDeclared ? "timer red-timer hidden" : "timer red-timer"
      } `}
    >
      <div className="timer-text">
        <p className="timer-turn">{`${
          isComputerPlaying ? "your turn" : "player 1's turn"
        }`}</p>
        <p className="timer-seconds-left">{timePerMove}s</p>
      </div>
    </div>
  );
};

export default RedTimer;
