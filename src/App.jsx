// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersList from "./modules/users/Components/UsersList/UsersList";
import RecipesList from "./modules/recipes/Components/RecipesList/RecipesList";
import RecipiesData from "./modules/recipes/Components/RecipesData/RecipesData";
import CategoryData from "./modules/categories/Components/CategoryData/CategoryData";
import CategoriesList from "./modules/categories/Components/CategoriesList/CategoriesList";
import Login from "./modules/authentication/components/Login/Login";
import ResetPass from "./modules/authentication/components/ResetPass/ResetPass";
import ForgetPass from "./modules/authentication/components/ForgetPass/ForgetPass";
import Registeration from "./modules/authentication/components/Registeration/Registeration";
import AuthLayout from "./modules/shared/Components/AuthLayout/AuthLayout";
import NotFound from "./modules/shared/Components/NotFound/NotFound";
import MasterLayout from "./modules/shared/Components/MasterLayout/MasterLayout";
import "./index.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/shared/Components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import RecipiesForm from "./modules/recipes/Components/RecipiesForm/RecipiesForm";
import Verify from "./modules/authentication/components/Verify/Verify";
import { AuthContext } from "./context/AuthContext";
import Favourites from "./modules/Favourites/Components/Favourites";
function App() {
  const { loginData } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> }, // Home page
        { path: "register", element: <Registeration /> },
        { path: "login", element: <Login /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "login/Forget", element: <ForgetPass /> },
        { path: "verify", element: <Verify /> },
      ],
    },
    {
      path: "DashBoard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "users", element: <UsersList /> },

        { path: "recipes/:recipeId", element: <RecipiesForm /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-Data", element: <RecipiesData /> },
        { path: "categories", element: <CategoriesList /> },

        { path: "category-Data", element: <CategoryData /> },
        {
          path: "favorites",
          element: (
            <ProtectedRoute>
              {" "}
              <Favourites />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
