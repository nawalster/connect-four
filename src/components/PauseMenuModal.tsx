import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closePauseMenu } from "../reducers/gameSlice";
import { RootState } from "../store/store";

const PauseMenuModal = () => {
  const isPauseMenuOpen = useSelector(
    (state: RootState) => state.game.isPauseMenuOpen
  );
  const dispatch = useDispatch();

  const handleClosePauseMenu = () => {
    dispatch(closePauseMenu());
  };

  return (
    <div
      className={`${
        isPauseMenuOpen ? "pause-menu-overlay show-modal" : "pause-menu-overlay"
      }`}
    >
      <div className="pause-menu">
        <h1 className="pause-menu-header">pause</h1>

        <div>
          <button
            className="menu-btn pause-menu-btn text-center"
            onClick={handleClosePauseMenu}
          >
            continue game
          </button>
          <button className="menu-btn pause-menu-btn text-center">
            restart
          </button>
          <Link
            to="/"
            className="menu-link pause-menu-link text-center pink-bg-clr white-text-clr"
            onClick={handleClosePauseMenu}
          >
            quit game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PauseMenuModal;
