import createSageMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import { rootReducer } from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSageMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;
