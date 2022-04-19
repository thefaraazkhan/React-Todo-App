import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Navigation from "./components/Navigation/Navigation";

ReactDOM.render(
  <React.StrictMode>
    {/* <Navigation /> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
