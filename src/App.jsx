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
import ProtectedRoute from "./modules/shared/Components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import RecipiesForm from "./modules/recipes/Components/RecipiesForm/RecipiesForm";
import Verify from "./modules/authentication/components/Verify/Verify";
import Favourites from "./modules/Favourites/Components/Favourites";
import AdminProtectedComponent from "./modules/shared/Components/ProtectedComponent/AdminProtected";
import UserProtectedComponent from "./modules/shared/Components/ProtectedComponent/UserProtected";
function App() {
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
        {
          path: "users",
          element: (
            <AdminProtectedComponent>
              <UsersList />
            </AdminProtectedComponent>
          ),
        },

        {
          path: "recipes/:recipeId",
          element: (
            <AdminProtectedComponent>
              <RecipiesForm />
            </AdminProtectedComponent>
          ),
        },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-Data", element: <RecipiesData /> },
        {
          path: "categories",
          element: (
            <AdminProtectedComponent>
              <CategoriesList />
            </AdminProtectedComponent>
          ),
        },
        {
          path: "recipes/recipe-form",
          element: <RecipiesForm />,
        },
        { path: "category-Data", element: <CategoryData /> },
        {
          path: "favorites",
          element: (
            <UserProtectedComponent>
              {" "}
              <Favourites />
            </UserProtectedComponent>
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
