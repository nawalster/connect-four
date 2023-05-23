import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const YellowTimer = () => {
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
        isWinnerDeclared ? "timer yellow-timer hidden" : "timer yellow-timer"
      } `}
    >
      <div className="timer-text">
        <p className="timer-turn">{`${
          isComputerPlaying ? "cpu's turn" : "player 2's turn"
        }`}</p>
        <p className="timer-seconds-left">{timePerMove}s</p>
      </div>
    </div>
  );
};

export default YellowTimer;
