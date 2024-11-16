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
import ChangePass from "./modules/authentication/components/ChangePass/ChangePass";
import Registeration from "./modules/authentication/components/Registeration/Registeration";
import AuthLayout from "./modules/shared/Components/AuthLayout/AuthLayout";
import NotFound from "./modules/shared/Components/NotFound/NotFound";
import MasterLayout from "./modules/shared/Components/MasterLayout/MasterLayout";
import "./index.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/shared/Components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import RecipiesForm from "./modules/recipes/Components/RecipiesForm/RecipiesForm";
function App() {
  // eslint-disable-next-line no-unused-vars
  const [loginData, setLoginData] = useState(null);
  let saveLoginData = () => {
    let decodedToken = localStorage.getItem("token");
    let encodedToken = jwtDecode(decodedToken);
    console.log(encodedToken);
    setLoginData(encodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> }, // Home page
        { path: "register", element: <Registeration /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "login/Forget", element: <ForgetPass /> },
        { path: "change-password", element: <ChangePass /> },
      ],
    },
    {
      path: "DashBoard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard loginData={loginData} /> },
        { path: "users", element: <UsersList loginData={loginData} /> },
        { path: "recipes/:recipesId", element: <RecipiesForm /> },
        { path: "recipes/new-recipe", element: <RecipiesForm /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-Data", element: <RecipiesData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "category-Data", element: <CategoryData /> },
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
