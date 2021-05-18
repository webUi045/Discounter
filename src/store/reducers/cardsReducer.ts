import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICardsObj, IRequestCardsSuccessful } from "../actionTypes/cardsPayloadActionTypes";

export interface IInitialState {
    cards: ICardsObj;
    loading: boolean;
}

const initialState: IInitialState = {
    cards: {},
    loading: true,
};



const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        requestCards(state: IInitialState, action: PayloadAction<string>) {
            state.loading = true;
        },

        requestCardsSuccessful(state: IInitialState, action: PayloadAction<IRequestCardsSuccessful>) {
            state.loading = false;
            state.cards = action.payload.cards;
        },

        requestCardsFailed(state: IInitialState) {
            state.loading = false;
        },
    },
});

export const { requestCards, requestCardsSuccessful, requestCardsFailed } = cardsSlice.actions;
export const { reducer } = cardsSlice;