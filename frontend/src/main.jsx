import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  init,
  miniApp,
  themeParams,
} from "@tma.js/sdk";

import "./index.css";
import App from "./App.jsx";

import AuthProvider from "./context/AuthContext.jsx";


try {
  init();

  console.log(
    "Telegram initialized"
  );

  console.log(
    "Telegram WebApp:",
    window.Telegram?.WebApp
  );

  miniApp.ready();
  miniApp.expand();

  themeParams.mount();

} catch (error) {
  console.log(
    "Telegram initialization skipped:",
    error.message
  );
}



createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <AuthProvider>

      <App />

    </AuthProvider>

  </StrictMode>

);