import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.ts";
import React from "react";
import { ThemeProviderCustom } from "./theme/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProviderCustom>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProviderCustom>
    </Provider>
  </React.StrictMode>
);
