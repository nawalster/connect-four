import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleTurn,
  updatePieces,
  turnOnAnimation,
  resetCountdown,
  declareWinner,
  declareDraw,
} from "../reducers/gameSlice";
import { RootState } from "../store/store";
import RedIndicator from "../assets/images/marker-red.svg";
import YellowIndicator from "../assets/images/marker-yellow.svg";

const GameBoard = () => {
  const isRedTurn = useSelector((state: RootState) => state.game.isRedTurn);
  const pieces = useSelector((state: RootState) => state.game.pieces);
  const isWinnerDeclared = useSelector(
    (state: RootState) => state.game.isWinnerDeclared
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCountdown());
    const player = isRedTurn ? 1 : 2;
    dispatch(toggleTurn());
    checkForEndOfGame(player, pieces);
  }, [pieces]);

  const getFirstAvailableRow = (pieces: any, column: any) => {
    return pieces
      .filter((_: any, index: any) => index % 7 === column)
      .lastIndexOf(0);
  };

  const removeUnplacedPiece = () => {
    const previousIndicator = document.querySelector("[data-placed='false']");

    if (previousIndicator) {
      previousIndicator.parentElement?.removeChild(previousIndicator);
    }
  };
  const mouseOverColumnIndicator = (column: any) => {
    const player: any = isRedTurn ? 1 : 2;
    const availableRow = getFirstAvailableRow(pieces, column);

    if (availableRow === -1) {
      removeUnplacedPiece();
      return;
    }
    if (isWinnerDeclared) {
      return;
    }
    removeUnplacedPiece();

    const gameboard = document.querySelector(".gameboard");
    const boardColumn = gameboard?.children[column];
    const indicator = document.createElement("img");
    indicator.className = "column-indicator";
    indicator.dataset.placed = String(false);
    indicator.src = `${isRedTurn ? RedIndicator : YellowIndicator}`;
    indicator.dataset.player = player;
    boardColumn?.appendChild(indicator);
  };

  const gamePieceDropAnimation = (gamePiece: any, pieceDropHeight: any) => {
    gamePiece.animate(
      [
        { transform: `translateY(${pieceDropHeight}px)`, offset: 0 },
        { transform: `translateY(0px)`, offset: 0.6 },
        { transform: `translateY(${pieceDropHeight / 30}px)`, offset: 0.8 },
        { transform: `translateY(0px)`, offset: 0.95 },
      ],
      {
        duration: 600,
        easing: "linear",
        iterations: 1,
      }
    );
  };

  const handlePlayerMove = (e: any, column: any) => {
    if (isWinnerDeclared) {
      e.preventDefault();
      return;
    }

    const gameboard = document.querySelector(".gameboard");
    const availableRow = getFirstAvailableRow(pieces, column);

    if (availableRow === -1) {
      removeUnplacedPiece();
      return;
    }

    const indexToUpdate = availableRow * 7 + column;

    const player = isRedTurn ? 1 : 2;

    dispatch(updatePieces({ indexToUpdate, player }));

    const boardColumn = gameboard?.children[indexToUpdate];
    const gamePiece = document.createElement("div");
    gamePiece.className = "game-piece";
    gamePiece.dataset.placed = String(true);
    gamePiece.dataset.player = String(player);
    boardColumn?.appendChild(gamePiece);

    const unplacedGamePiece = document.querySelector("[data-placed='false']");
    const unplacedY = unplacedGamePiece?.getBoundingClientRect().y;
    const placedY = gamePiece.getBoundingClientRect().y;
    if (!unplacedY) return;
    const yDiff = unplacedY - placedY;
    console.log(yDiff);

    dispatch(turnOnAnimation());
    gamePieceDropAnimation(gamePiece, yDiff);
    dispatch(resetCountdown());
  };

  const addWinMarker = (boardCell: any) => {
    // adds circle indicators on the winning game pieces
    const gameboard = document.querySelector(".gameboard");

    const winMarker = document.createElement("div");
    winMarker.className = "piece-win-marker";
    setTimeout(() => {
      gameboard?.children[boardCell].appendChild(winMarker);
    }, 500);
  };

  const didPlayerWin = (player: any, pieces: any) => {
    // returns true if there is a winning row of 4 game pieces
    for (let index = 0; index < 42; index++) {
      // check horizontal win starting at index
      if (
        index % 7 < 4 &&
        pieces[index] === player &&
        pieces[index + 1] === player &&
        pieces[index + 2] === player &&
        pieces[index + 3] === player
      ) {
        [index, index + 1, index + 2, index + 3].forEach((boardCell) =>
          addWinMarker(boardCell)
        );

        return true;
      }

      // check vertical win starting at index
      if (
        index < 21 &&
        pieces[index] === player &&
        pieces[index + 7] === player &&
        pieces[index + 14] === player &&
        pieces[index + 21] === player
      ) {
        [index, index + 7, index + 14, index + 21].forEach((boardCell) =>
          addWinMarker(boardCell)
        );
        return true;
      }

      // check diagonal win starting at index
      if (
        index % 7 < 4 &&
        index < 18 &&
        pieces[index] === player &&
        pieces[index + 8] === player &&
        pieces[index + 16] === player &&
        pieces[index + 24] === player
      ) {
        [index, index + 8, index + 16, index + 24].forEach((boardCell) =>
          addWinMarker(boardCell)
        );
        return true;
      }

      // check diagonal win starting at the opposite direction
      if (
        index % 7 >= 3 &&
        index < 21 &&
        pieces[index] === player &&
        pieces[index + 6] === player &&
        pieces[index + 12] === player &&
        pieces[index + 18] === player
      ) {
        [index, index + 6, index + 12, index + 18].forEach((boardCell) =>
          addWinMarker(boardCell)
        );
        return true;
      }
    }

    return false;
  };

  const checkForEndOfGame = (player: any, pieces: any) => {
    if (didPlayerWin(player, pieces)) {
      dispatch(declareWinner({ currentPlayer: player }));
      dispatch(turnOnAnimation());
      console.log("WINNER: " + player);
      console.log("isWinnerDeclared: " + isWinnerDeclared);
    }
    if (!didPlayerWin(player, pieces)) {
      dispatch(turnOnAnimation());
      // dispatch(toggleTurn());
    }
    if (!pieces.includes(0)) {
      dispatch(declareDraw());
      // declareWinner(0);
    }
  };

  return (
    <div className="gameboard">
      {Array(42)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="cell"
              onMouseOver={() => mouseOverColumnIndicator(index % 7)}
              onClick={(e) => handlePlayerMove(e, index % 7)}
            ></div>
          );
        })}
    </div>
  );
};

export default GameBoard;
