import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import packageJson from "../package.json";
import CacheBuster from "./CacheBuster";

global.appVersion = packageJson.version;


ReactDOM.render(
  <CacheBuster appVersion={global.appVersion}>
    <App />
  </CacheBuster>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
