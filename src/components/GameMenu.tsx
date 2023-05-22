import React from "react";
import { Link } from "react-router-dom";
import PlayVPlayIcon from "../assets/images/player-vs-player.svg";

const GameMenu = () => {
  return (
    <div className="menu">
      <div>
        <Link
          to="/gamescreen"
          className="menu-link yellow-bg-clr black-text-clr"
        >
          play vs player
          <img
            src={PlayVPlayIcon}
            alt="player vs player icon"
            className="menu-link-icon"
          />
        </Link>

        <button className="menu-btn">game rules</button>
      </div>
    </div>
  );
};

export default GameMenu;
