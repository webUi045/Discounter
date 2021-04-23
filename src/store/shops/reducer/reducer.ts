import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IShop, IRequestShopsSuccessful } from "../payloadActionTypes";

export interface IInitialState {
  shops: IShop[] | [];
  loading: boolean;
}

const initialState: IInitialState = {
  shops: [],
  loading: true,
};

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    requestShops(state: IInitialState) {
      state.loading = true;
    },

    requestShopsSuccessful(state: IInitialState, action: PayloadAction<IRequestShopsSuccessful>) {
      state.loading = false;
      state.shops = action.payload.shops;
    },

    requestShopsFailed(state: IInitialState) {
      state.loading = false;
    },
  },
});

export const { requestShops, requestShopsSuccessful, requestShopsFailed } = shopsSlice.actions;
export const { reducer } = shopsSlice;