import { combineReducers } from 'redux';
import createSageMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import { reducer as shopReducer } from './shops/reducer/reducer';
import { reducer as profileReducer} from './profile/reducer/reducer';
import rootSaga from "./sagas/rootSaga";

export const rootReducer = combineReducers({
  shops: shopReducer,
  profile: profileReducer,
});

const sagaMiddleware = createSageMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;

export type RootState = ReturnType<typeof rootReducer>;