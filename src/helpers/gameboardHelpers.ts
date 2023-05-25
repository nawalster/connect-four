export const clearBoardDOM = () => {
  [...document.querySelectorAll(".game-piece")].forEach((piece) => {
    piece.remove();
  });
  [...document.querySelectorAll(".piece-win-marker")].forEach((marker) => {
    marker.remove();
  });
};

export const getFirstAvailableRow = (pieces: number[], column: number) => {
  return pieces
    .filter((_: number, index: number) => index % 7 === column)
    .lastIndexOf(0);
};

export const removeUnplacedPiece = () => {
  const previousIndicator = document.querySelector("[data-placed='false']");

  if (previousIndicator) {
    previousIndicator.parentElement?.removeChild(previousIndicator);
  }
};
export const mouseOverColumnIndicator = (
  column: number,
  isRedTurn: boolean,
  pieces: number[],
  isWinnerDeclared: boolean,
  RedIndicator: string,
  YellowIndicator: string
) => {
  const player: number = isRedTurn ? 1 : 2;
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
  indicator.dataset.player = String(player);
  boardColumn?.appendChild(indicator);
};

export const gamePieceDropAnimation = (
  gamePiece: HTMLElement,
  pieceDropHeight: number
) => {
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

export const handlePlayerMove = (
  // e: Event,
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  column: number,
  isWinnerDeclared: boolean,
  pieces: number[],
  isRedTurn: boolean,
  dispatch: (action: any) => void,
  updatePieces: (payload: { indexToUpdate: number; player: number }) => void,
  turnOnAnimation: () => void,
  resetCountdown: () => void
) => {
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

export const addWinMarker = (boardCell: number) => {
  const gameboard = document.querySelector(".gameboard");

  const winMarker = document.createElement("div");
  winMarker.className = "piece-win-marker";
  setTimeout(() => {
    gameboard?.children[boardCell].appendChild(winMarker);
  }, 500);
};

export const didPlayerWin = (player: number, pieces: number[]) => {
  for (let index = 0; index < 42; index++) {
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

export const checkForEndOfGame = (
  player: number,
  pieces: number[],
  dispatch: (action: any) => void,
  declareWinner: (payload: { currentPlayer: number }) => void,
  turnOnAnimation: () => void,
  declareDraw: () => void
) => {
  if (didPlayerWin(player, pieces)) {
    dispatch(declareWinner({ currentPlayer: player }));
    dispatch(turnOnAnimation());
  }
  if (!didPlayerWin(player, pieces)) {
    dispatch(turnOnAnimation());
  }
  if (!pieces.includes(0)) {
    dispatch(declareDraw());
  }
};
