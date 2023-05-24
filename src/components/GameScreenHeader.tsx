import React from "react";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { displayPauseMenu, restartGame } from "../reducers/gameSlice";
import { clearBoardDOM } from "../helpers/helpers";

const GameScreenHeader = () => {
  const dispatch = useDispatch();

  const handleOpenPauseMenu = () => {
    dispatch(displayPauseMenu());
  };
  const handleRestart = () => {
    dispatch(restartGame());
    clearBoardDOM();
  };

  return (
    <div className="game-screen-header">
      <button
        className="game-screen-btn game-screen-menu-btn"
        onClick={handleOpenPauseMenu}
      >
        Menu
      </button>
      <Logo />
      <button className="game-screen-btn" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};

export default GameScreenHeader;
