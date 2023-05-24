import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { countdown, otherPlayerIsWinner } from "../reducers/gameSlice";

const RedTimer = () => {
  const dispatch = useDispatch();
  const isWinnerDeclared = useSelector(
    (state: RootState) => state.game.isWinnerDeclared
  );
  const isComputerPlaying = useSelector(
    (state: RootState) => state.game.isComputerPlaying
  );
  const timePerMove = useSelector((state: RootState) => state.game.timePerMove);

  const isPauseMenuOpen = useSelector(
    (state: RootState) => state.game.isPauseMenuOpen
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPauseMenuOpen) {
        dispatch(countdown());

        if (timePerMove === 0) {
          // 1 = red player
          dispatch(otherPlayerIsWinner({ currentPlayer: 1 }));
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPauseMenuOpen, timePerMove, dispatch]);

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
