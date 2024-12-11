import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./app/store";
import App from "./App";
import { makeServer } from "./server";
import "./index.css";

// Call make Server
makeServer();

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Toaster position="top-center" />
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
