import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { store } from "app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList";
import { Login } from "features/auth/ui/login/login";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <TodolistsList />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  }
])

const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
