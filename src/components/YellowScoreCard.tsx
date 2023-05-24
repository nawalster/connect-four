import Player2Icon from "../assets/images/player-two.svg";
import CPUIcon from "../assets/images/cpu.svg";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const YellowScoreCard = () => {
  const isComputerPlaying = useSelector(
    (state: RootState) => state.game.isComputerPlaying
  );
  const yellowScore = useSelector((state: RootState) => state.game.yellowScore);
  return (
    <div className="score-card yellow-card">
      <img
        src={`${isComputerPlaying ? CPUIcon : Player2Icon}`}
        alt="player 1"
        className="player-icon"
      />

      <div className="score-card-stats stat-mg-right">
        <p className="score-card-player-title opp-title">{`${
          isComputerPlaying ? "cpu" : "player 2"
        }`}</p>
        <p className="score-card-score">{yellowScore}</p>
      </div>
    </div>
  );
};

export default YellowScoreCard;
