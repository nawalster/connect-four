import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  isGameRulesOpen: boolean;
  isPauseMenuOpen: boolean;
  isComputerPlaying: boolean;
  isRedTurn: boolean;
  redScore: number;
  yellowScore: number;
  timePerMove: number;
  firstTurnRed: boolean;
  isAnimationInProgress: boolean;
  isWinnerDeclared: boolean;
  isDraw: boolean;
  pieces: number[];
  winningPiece: number;
}

const initialState: GameState = {
  isGameRulesOpen: false,
  isPauseMenuOpen: false,
  isComputerPlaying: false,
  isRedTurn: true,
  redScore: 0,
  yellowScore: 0,
  timePerMove: 30,
  firstTurnRed: true,
  isAnimationInProgress: false,
  isWinnerDeclared: false,
  isDraw: false,
  pieces: Array(42).fill(0),
  winningPiece: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    displayGameRules: (state) => {
      state.isGameRulesOpen = true;
    },
    closeGameRules: (state) => {
      state.isGameRulesOpen = false;
    },
    displayPauseMenu: (state) => {
      state.isPauseMenuOpen = true;
    },
    closePauseMenu: (state) => {
      state.isPauseMenuOpen = false;
    },
    toggleTurn: (state) => {
      state.isRedTurn = !state.isRedTurn;
    },
    updatePieces: (
      state,
      action: PayloadAction<{ indexToUpdate: number; player: number }>
    ) => {
      const { indexToUpdate, player } = action.payload;
      state.pieces[indexToUpdate] = player;
    },
    turnOffAnimation: (state) => {
      state.isAnimationInProgress = false;
    },
    turnOnAnimation: (state) => {
      state.isAnimationInProgress = true;
    },
    declareDraw: (state) => {
      state.isDraw = true;
    },
    countdown: (state) => {
      state.timePerMove -= 1;
    },
    resetCountdown: (state) => {
      state.timePerMove = 30;
    },
    playAgain: (state) => {
      return {
        ...state,
        firstTurnRed: state.isRedTurn ? false : true,
        // isComputerPlaying: state.isComputerPlaying ? true : false,
        isRedTurn: state.isRedTurn ? false : true,
        isAnimationInProgress: false,
        isWinnerDeclared: false,
        isDraw: false,
        pieces: Array(42).fill(0),
        winningPiece: 0,
      };
    },
    restartGame: () => {
      return initialState;
    },
    addPointToScore: (state, action: PayloadAction<{ player: number }>) => {
      const { player } = action.payload;

      if (player === 1) {
        state.redScore += 1;
      } else if (player === 2) {
        state.yellowScore += 1;
      }
    },
    otherPlayerIsWinner: (
      state,
      action: PayloadAction<{ currentPlayer: number }>
    ) => {
      const { currentPlayer } = action.payload;
      state.isWinnerDeclared = true;
      state.isAnimationInProgress = true;
      state.isRedTurn = !state.isRedTurn;

      if (currentPlayer === 1) {
        state.yellowScore += 1;
      } else if (currentPlayer === 2) {
        state.redScore += 1;
      }
    },
    declareWinner: (
      state,
      action: PayloadAction<{ currentPlayer: number }>
    ) => {
      const { currentPlayer } = action.payload;
      state.isWinnerDeclared = true;
      state.isAnimationInProgress = true;

      if (currentPlayer === 1) {
        state.redScore += 1;
        state.winningPiece = 1;
      } else if (currentPlayer === 2) {
        state.yellowScore += 1;
        state.winningPiece = 2;
      }
    },
  },
});

export const {
  displayGameRules,
  closeGameRules,
  displayPauseMenu,
  closePauseMenu,
  toggleTurn,
  updatePieces,
  turnOffAnimation,
  turnOnAnimation,
  declareWinner,
  declareDraw,
  countdown,
  resetCountdown,
  restartGame,
  playAgain,
  addPointToScore,
  otherPlayerIsWinner,
} = gameSlice.actions;
export default gameSlice.reducer;
