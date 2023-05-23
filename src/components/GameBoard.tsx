import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTurn, updatePiecesState } from "../reducers/gameSlice";
import { RootState } from "../store/store";

const GameBoard = () => {
  const isRedTurn = useSelector((state: RootState) => state.game.isRedTurn);
  const pieces = useSelector((state: RootState) => state.game.pieces);
  const dispatch = useDispatch();

  return (
    <div className="gameboard">
      {Array(42)
        .fill(0)
        .map((_, index) => {
          return <div key={index} className="cell"></div>;
        })}
    </div>
  );
};

export default GameBoard;
