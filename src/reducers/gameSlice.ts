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
    updatePiecesState: (
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
    declareWinner: (state) => {
      state.isWinnerDeclared = true;
    },
    declareDraw: (state) => {
      state.isDraw = true;
    },
    addPointToRed: (state) => {
      state.redScore += 1;
    },
    addPointToYellow: (state) => {
      state.yellowScore += 1;
    },
    countdown: (state) => {
      state.timePerMove -= 1;
    },
    resetCountdown: (state) => {
      state.timePerMove = 30;
    },
    startNewGame: () => {
      return initialState;
    },
  },
});

export const {
  displayGameRules,
  closeGameRules,
  displayPauseMenu,
  closePauseMenu,
  toggleTurn,
  updatePiecesState,
  turnOffAnimation,
  turnOnAnimation,
  declareWinner,
  declareDraw,
  addPointToRed,
  addPointToYellow,
  countdown,
  resetCountdown,
  startNewGame,
} = gameSlice.actions;

export default gameSlice.reducer;
