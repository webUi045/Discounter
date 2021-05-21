import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ICard,
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

    requestAddCard(state: IInitialState, action: PayloadAction<{uid: string, card: ICard}>) {
      state.error = "";
    },

    requestAddCardSuccessful(state: IInitialState, action: PayloadAction<{key: string, card: ICard}>) {
      if (state.cards === null) {
        state.cards = {}
      }
      state.cards[action.payload.key] = action.payload.card;
      state.error = "";
    },
  },
});

export const { requestCards, requestCardsSuccessful, requestCardsFailed, requestAddCard, requestAddCardSuccessful } = cardsSlice.actions;
export const { reducer } = cardsSlice;
