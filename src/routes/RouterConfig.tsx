import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./CONSTANTS";
import CategoryListPage from "../pages/categories/CategoryListPage";
import CategoryFormPage from "../pages/categories/CategoryFormPage";
import LoginPage from "../pages/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import ProductListPage from "../pages/products/ProductListPage";
import ProductFormPage from "../pages/products/ProductFormPage";

export const routerConfig = createBrowserRouter([
  {
    path: Routes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: Routes.HOME,
    element: <HomePage />,
  },
  {
    path: Routes.CATEGORY.LIST,
    element: <CategoryListPage />,
  },
  {
    path: Routes.CATEGORY.CREATE,
    element: <CategoryFormPage />,
  },
  {
    path: Routes.CATEGORY.EDIT,
    element: <CategoryFormPage />,
  },
  {
    path: Routes.PRODUCT.LIST,
    element: <ProductListPage />,
  },
  {
    path: Routes.PRODUCT.CREATE,
    element: <ProductFormPage />,
  },
  {
    path: Routes.PRODUCT.EDIT,
    element: <ProductFormPage />,
  },
  
]);