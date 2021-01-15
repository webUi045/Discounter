import { combineReducers } from "redux";
import { reducer } from "./discounterReducer";

export const rootReducer = combineReducers({
  store: reducer,
});
