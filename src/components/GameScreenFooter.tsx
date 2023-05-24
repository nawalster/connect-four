import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const GameScreenFooter = () => {
  const isWinnerDeclared = useSelector(
    (state: RootState) => state.game.isWinnerDeclared
  );
  const winningPiece = useSelector(
    (state: RootState) => state.game.winningPiece
  );
  return (
    <div
      className={`${
        isWinnerDeclared
          ? winningPiece === 1
            ? "footer-background pink-bg-clr"
            : "footer-background yellow-bg-clr"
          : "footer-background purple-dark-bg-clr"
      }`}
    ></div>
  );
};

export default GameScreenFooter;
