import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "../../types";

interface IShopsRecieved {
  shops: IShop[];
}
interface IInitialState {
  shops: IShop[] | [];
  loading: boolean;
}

const initialState: IInitialState = {
  shops: [],
  loading: false,
};

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    shopsRequested(state: IInitialState) {
      state.loading = true;
    },
    shopsRecieved(state: IInitialState, action: PayloadAction<IShopsRecieved>) {
      state.loading = false;
      state.shops = action.payload.shops;
      
     
    },
    shopsFailed(state: IInitialState) {
      state.loading = false;
    },
  },
});
export const {
  shopsRequested,
  shopsRecieved,
  shopsFailed,
} = shopsSlice.actions;
export const { reducer } = shopsSlice;
