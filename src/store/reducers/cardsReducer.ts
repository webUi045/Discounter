import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ICardsObj,
  IRequestCardsSuccessful,
} from "../actionTypes/cardsPayloadActionTypes";

export interface IInitialState {
  cards: ICardsObj;
  error: string;
}

const initialState: IInitialState = {
  cards: {},
  error: "",
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    requestCards(state: IInitialState) {
      state.error = "";
    },

    requestCardsSuccessful(
      state: IInitialState,
      action: PayloadAction<IRequestCardsSuccessful>
    ) {
      state.cards = action.payload.cards;
      state.error = "";
    },

    requestCardsFailed(state: IInitialState) {
      state.error = "Something went wrong";
    },
  },
});

export const { requestCards, requestCardsSuccessful, requestCardsFailed } = cardsSlice.actions;
export const { reducer } = cardsSlice;
