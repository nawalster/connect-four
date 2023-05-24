import { Link } from "react-router-dom";
import Logo from "./Logo";
import PlayVPlayIcon from "../assets/images/player-vs-player.svg";
import { useDispatch } from "react-redux";
import { displayGameRules } from "../reducers/gameSlice";

const GameMenu = () => {
  const dispatch = useDispatch();

  const handleOpenGameRules = () => {
    dispatch(displayGameRules());
  };
  return (
    <div className="menu">
      <Logo />
      <div>
        <Link to="/game" className="menu-link yellow-bg-clr black-text-clr">
          play vs player
          <img
            src={PlayVPlayIcon}
            alt="player vs player icon"
            className="menu-link-icon"
          />
        </Link>

        <button className="menu-btn" onClick={handleOpenGameRules}>
          game rules
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
