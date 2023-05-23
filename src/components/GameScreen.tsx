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

const GameScreen = () => {
  return (
    <main>
      <div className="game-screen-container">
        <GameScreenHeader />
        <div className="score-card-layout">
          <RedScoreCard />
          <YellowScoreCard />
        </div>
        <GameBoard />
        <RedTimer />
        <YellowTimer />
        <WinnerCard />
        <PauseMenuModal />
      </div>
      <GameScreenFooter />
    </main>
  );
};

export default GameScreen;
