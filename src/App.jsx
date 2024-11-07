// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersList from "./modules/users/Components/UsersList/UsersList";
import RecipesList from "./modules/recipes/Components/RecipesList/RecipiesList";
import RecipiesData from "./modules/recipes/Components/RecipesData/RecipesData";
import CategoryData from "./modules/categories/Components/CategoryData/CategoryData";
import CategoriesList from "./modules/categories/Components/CategoriesList/CategoriesList";
import Login from "./modules/authentication/components/Login/Login";
import ResetPass from "./modules/authentication/components/ResetPass/ResetPass";
import ForgetPass from "./modules/authentication/components/ForgetPass/ForgetPass";
import ChangePass from "./modules/authentication/components/ChangePass/ChangePass";
import Registeration from "./modules/authentication/components/Registeration/Registeration";
import AuthLayout from "./modules/shared/Components/AuthLayout/AuthLayout";
import NotFound from "./modules/shared/Components/NotFound/NotFound";
import MasterLayout from "./modules/shared/Components/MasterLayout/MasterLayout";
import "./index.css";
import "./App.css";
import { ToastContainer } from "react-toastify";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> }, // Home page
      { path: "Register", element: <Registeration /> },
      { path: "login", element: <Login /> },
      { path: "Reset", element: <ResetPass /> },
      { path: "Forget", element: <ForgetPass /> },
      { path: "login/Forget", element: <ForgetPass /> },
      { path: "ChangePass", element: <ChangePass /> },
    ],
  },
  {
    path: "DashBoard",
    element: <MasterLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "users", element: <UsersList /> },
      { path: "recipes", element: <RecipesList /> },
      { path: "recipe-Data", element: <RecipiesData /> },
      { path: "categories", element: <CategoriesList /> },
      { path: "category-Data", element: <CategoryData /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
