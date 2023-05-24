import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { countdown, otherPlayerIsWinner } from "../reducers/gameSlice";

const YellowTimer = () => {
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
          // 2 = yellow player
          dispatch(otherPlayerIsWinner({ currentPlayer: 2 }));
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
