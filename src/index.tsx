import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./base.scss"
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store = {store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);