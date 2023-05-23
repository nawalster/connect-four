import React from "react";
import CheckIcon from "../assets/images/icon-check.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { closeGameRules } from "../reducers/gameSlice";

const GameRulesModal = () => {
  const dispatch = useDispatch();
  const isGameRulesOpen = useSelector(
    (state: RootState) => state.game.isGameRulesOpen
  );

  const handleCloseGameRules = () => {
    dispatch(closeGameRules());
  };
  return (
    <div
      className={`${
        isGameRulesOpen ? "game-rules-overlay show-modal" : "game-rules-overlay"
      }`}
    >
      <article className="game-rules-modal">
        <h1 className="game-rules-modal-header">rules</h1>
        <div className="game-rules-modal-body">
          <div className="game-rules-section-1">
            <h2 className="game-rules-modal-subheader">objective</h2>
            <p className="game-rules-modal-content">
              Be the first player to connect 4 of the same colored discs in a
              row (either vertically, horizontally, or diagonally).
            </p>
          </div>
          <div>
            <h2 className="game-rules-modal-subheader">how to play</h2>
            <ol className="games-rules-modal-list">
              <li className="game-rules-modal-content">
                Red goes first in the first game.
              </li>
              <li className="game-rules-modal-content">
                Players must alternate turns, and only one disc can be dropped
                in each turn.
              </li>
              <li className="game-rules-modal-content">
                The game ends when there is a 4-in-a-row or a stalemate.
              </li>
              <li className="game-rules-modal-content">
                The starter of the previous game goes second on the next game.
              </li>
            </ol>
          </div>
        </div>
        <button
          className="check-mark check-mark-btn"
          onClick={handleCloseGameRules}
        ></button>
      </article>
    </div>
  );
};

export default GameRulesModal;
