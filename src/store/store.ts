import { configureStore } from "@reduxjs/toolkit";
import gameReducer, { GameState } from "../reducers/gameSlice";

export interface RootState {
  game: GameState;
}
const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default store;
