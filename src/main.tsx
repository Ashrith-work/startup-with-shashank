import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { brand } from "./data/site.ts";
import "./index.css";

// Make the brand accent swappable from the single source of truth.
document.documentElement.style.setProperty("--accent", brand.accent);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
