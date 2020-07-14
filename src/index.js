import React from "react";
import { render } from "react-dom";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./actions/stores";
import { Provider } from "react-redux";

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app"),
  () => console.log("rendered")
);
