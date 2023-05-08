import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter, Route, Router } from "react-router-dom";
// import Navigation from "./components/Navigation/Navigation";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    {/* <Navigation /> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
