import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleTurn,
  updatePieces,
  turnOnAnimation,
  resetCountdown,
  declareWinner,
  declareDraw,
} from "../reducers/gameSlice";
import { RootState } from "../store/store";
import RedIndicator from "../assets/images/marker-red.svg";
import YellowIndicator from "../assets/images/marker-yellow.svg";
import {
  mouseOverColumnIndicator,
  checkForEndOfGame,
  handlePlayerMove,
} from "../helpers/gameboardHelpers";

const GameBoard = () => {
  const isRedTurn = useSelector((state: RootState) => state.game.isRedTurn);
  const pieces = useSelector((state: RootState) => state.game.pieces);
  const isWinnerDeclared = useSelector(
    (state: RootState) => state.game.isWinnerDeclared
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCountdown());
    const player = isRedTurn ? 1 : 2;
    dispatch(toggleTurn());
    checkForEndOfGame(
      player,
      pieces,
      dispatch,
      declareWinner,
      turnOnAnimation,
      declareDraw
    );
  }, [pieces]);

  return (
    <div className="gameboard">
      {Array(42)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="cell"
              onMouseOver={() =>
                mouseOverColumnIndicator(
                  index % 7,
                  isRedTurn,
                  pieces,
                  isWinnerDeclared,
                  RedIndicator,
                  YellowIndicator
                )
              }
              onClick={(e) =>
                handlePlayerMove(
                  e,
                  index % 7,
                  isWinnerDeclared,
                  pieces,
                  isRedTurn,
                  dispatch,
                  updatePieces,
                  turnOnAnimation,
                  resetCountdown
                )
              }
            ></div>
          );
        })}
    </div>
  );
};

export default GameBoard;
