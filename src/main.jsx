import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GameContext from "./constext/GameContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GameContext>
        <App />
      </GameContext>
    </BrowserRouter>
  </StrictMode>,
);
