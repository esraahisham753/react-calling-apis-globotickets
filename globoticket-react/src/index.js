import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import CartStore from "./CartStore";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={CartStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
