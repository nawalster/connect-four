import React from "react";
import GameBoard from "./GameBoard";
import GameScreenHeader from "./GameScreenHeader";
import GameScreenFooter from "./GameScreenFooter";
import RedScoreCard from "./RedScoreCard";
import YellowScoreCard from "./YellowScoreCard";
import RedTimer from "./RedTimer";
import YellowTimer from "./YellowTimer";
import WinnerCard from "./WinnerCard";
import PauseMenuModal from "./PauseMenuModal";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";

const GameScreen = () => {
  const isRedTurn = useSelector((state: RootState) => state.game.isRedTurn);
  const isWinnerDeclared = useSelector(
    (state: RootState) => state.game.isWinnerDeclared
  );
  const isDraw = useSelector((state: RootState) => state.game.isDraw);
  return (
    <main>
      <div className="game-screen-container">
        <GameScreenHeader />
        <div className="score-card-layout">
          <RedScoreCard />
          <YellowScoreCard />
        </div>
        <GameBoard />
        {isRedTurn ? <RedTimer /> : <YellowTimer />}
        {(isWinnerDeclared || isDraw) && <WinnerCard />}
        <PauseMenuModal />
      </div>
      <GameScreenFooter />
    </main>
  );
};

export default GameScreen;
