import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./css/main.css";
import Index from "./routes/index";
import Root, {loader as rootLoader} from "./routes/root";
import ErrorPage from "./error-page";
import Catalog, { loader as catalogLoader } from "./routes/catalog";
import {loader as searchLoader} from "./routes/search"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      { index: true, element: <Index /> },
      {
        path: ":category",
        element: <Catalog />,
        loader: catalogLoader
      },
      {
        path: "/search/:query",
        element: <Catalog />,
        loader: searchLoader
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
