import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  error: string
}

export interface IAddCard {
  uid: string;
  name: string;
  number: number;
  date: string;
  description: string;
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
