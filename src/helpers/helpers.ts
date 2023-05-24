export const clearBoardDOM = () => {
  [...document.querySelectorAll(".game-piece")].forEach((piece) => {
    piece.remove();
  });
  [...document.querySelectorAll(".piece-win-marker")].forEach((marker) => {
    marker.remove();
  });
};
