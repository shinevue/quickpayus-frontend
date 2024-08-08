import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./Routes";

import { store, AppDispatch } from "./app/store";

import { router } from "./Routes/Routes";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./Theme/themeProvider";
import { GlobalTheme } from "./Theme/globalTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <ThemeProvider>
        <GlobalTheme />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
