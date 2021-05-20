import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  IAddCard,
  ICardsObj,
  IRequestCardsSuccessful,
} from "../actionTypes/cardsPayloadActionTypes";

export interface IInitialState {
  cards: ICardsObj;
  error: string;
  addedSuccessful: string;
}

const initialState: IInitialState = {
  cards: {},
  error: "",
  addedSuccessful: 'card added'

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
    requestAddCard(state: IInitialState, action: PayloadAction<IAddCard>) {
      state.error = ''
    },
    requestAddCardSuccessful(state: IInitialState) {
      state.error = ''
    }

  },
});

export const { requestCards, requestCardsSuccessful, requestCardsFailed, requestAddCard, requestAddCardSuccessful } = cardsSlice.actions;
export const { reducer } = cardsSlice;
