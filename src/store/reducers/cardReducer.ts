import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../actionTypes/cardsPayloadActionTypes";

export interface IInitialState {
  cards: ICard[];
  loading: boolean;
  error: string;
}

const initialState: IInitialState = {
  cards: [],
  loading: true,
  error: '',
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    requestCards(state: IInitialState) {
      state.loading = true;
    },

    requestCardsSuccessful(
      state: IInitialState,
      action: PayloadAction<ICard[]>
    ) {
      state.loading = false;
      state.cards = action.payload;
    },

    requestCardsFailed(state: IInitialState) {
      state.loading = false;
      state.error = 'No cards to show';
    },
  },
});

export const { requestCards, requestCardsSuccessful, requestCardsFailed } = cardsSlice.actions;
export const { reducer } = cardsSlice;