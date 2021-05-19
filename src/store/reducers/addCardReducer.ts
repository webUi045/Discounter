import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  error: string
}

export interface IAddCard {
  uid: string;
  cardName: string;
  date: string;
  cardNum: number;
  profit: string;
}

const initialState = {
  error: '',
  addedSuccessful: 'card added'
}

const addCardSlice = createSlice({
  name: "Card",
  initialState,
  reducers: {
    requestAddCard(state: IInitialState, action: PayloadAction<IAddCard>) {
      state.error = ''
    },
    requestAddCardSuccessful(state: IInitialState) {
      state.error = ''
    }
  }
});

export const {requestAddCard, requestAddCardSuccessful} = addCardSlice.actions;
export const {reducer} = addCardSlice;
