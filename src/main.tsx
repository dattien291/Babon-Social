import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import ThemeContextProvider from "./contexts/Theme.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </ThemeContextProvider>
);
