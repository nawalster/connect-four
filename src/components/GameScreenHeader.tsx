import React from "react";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { displayPauseMenu } from "../reducers/gameSlice";

const GameScreenHeader = () => {
  const dispatch = useDispatch();

  const handleOpenPauseMenu = () => {
    dispatch(displayPauseMenu());
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
      <button className="game-screen-btn">Restart</button>
    </div>
  );
};

export default GameScreenHeader;
