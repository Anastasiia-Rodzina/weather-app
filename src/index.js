import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";

import "./index.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/weather-app">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
