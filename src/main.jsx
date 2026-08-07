import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GameContextProvider from "./context/GameContextProvider";
import ErrorBoundary from "./ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <GameContextProvider>
          <App />
        </GameContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
