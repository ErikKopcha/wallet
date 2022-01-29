import React from "react";
import ReactDOM from "react-dom";
import "./styleSheet/index.css";
import { BrowserRouter } from 'react-router-dom';

import App from "./components/App/App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
