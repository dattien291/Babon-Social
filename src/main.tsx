import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store/configureStore";
import { Provider } from "react-redux";
import ThemeContextProvider from "./contexts/Theme";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ToastContainer />
            <App />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === "development"} />
        </QueryClientProvider>
      </Provider>
    </ThemeContextProvider>
  </React.StrictMode>
);
