import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.scss";

import store from "./app/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
