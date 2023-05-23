import React from "react";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const GameScreenFooter = () => {
  const isWinnerDeclared = useSelector(
    (state: RootState) => state.game.isWinnerDeclared
  );
  return (
    <div
      className={`${
        isWinnerDeclared
          ? "footer-background yellow-bg-clr"
          : "footer-background purple-dark-bg-clr"
      }`}
    ></div>
  );
};

export default GameScreenFooter;
