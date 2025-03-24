import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SDKProvider } from "./services/api.service.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SDKProvider>
    <App />
  </SDKProvider>
);
