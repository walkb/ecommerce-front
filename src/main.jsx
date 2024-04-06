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
import ProductPage, {loader as productLoader} from "./routes/product";
import {loader as searchLoader} from "./routes/search"
import Cart, {loader as cartLoader} from "./routes/cart"


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
      },
      {
        path: "/products/:productId",
        element: <ProductPage />,
        loader: productLoader
      },
      {
        path: "/cart",
        element: <Cart />,
        loader: cartLoader
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
