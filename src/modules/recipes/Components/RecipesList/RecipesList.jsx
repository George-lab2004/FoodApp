import { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import ConfirmDelete from "../../../shared/Components/ConfrimDelete/ConfirmDelete";
import { toast } from "react-toastify";
import NoData from "../../../shared/Components/NoData/NoData";
import {
  axiosInstance,
  IMAGE_PATHS,
  RECIPE_URLS,
} from "../../../../services/urls/urls";
import { Link } from "react-router-dom";

export default function RecipesList() {
  const [RecipesList, setRecipesList] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRecipies = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(RECIPE_URLS.LIST);
      console.log(response?.data + "THATS FOR RECIPES SIUUUU");

      setRecipesList(response.data.data);
    } catch (error) {
      setLoading(false);

      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRecipies();
  }, []);

  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(RECIPE_URLS.DELETE_LIST(selectedId));
      toast.success("Deleted sucessfully");

      setShow(false);
      getRecipies();
    } catch (error) {
      toast.error(error);

      console.log(error);
    }
  };

  return (
    <>
      <Header
        title="Recipies items"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <ConfirmDelete
        show={show}
        deleteItem="Recipe"
        deleteFun={handleDelete}
        closeModal={() => setShow(false)}
      />
      <div className="d-flex justify-content-between">
        <h3>Recipes Table Details</h3>
        <Link to="recipes/new-recipe" className="btn btn-success m-3">
          Add New Recipe
        </Link>
      </div>
      <div className="p-4">
        {loading ? (
          <div className="loader mx-auto"></div>
        ) : RecipesList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {RecipesList.map((recipes) => (
                <tr key={recipes.id}>
                  <td>{recipes.name}</td>
                  <td>
                    <img
                      src={`${IMAGE_PATHS}/${recipes.imagePath}`}
                      alt={recipes.name}
                      className="w-25"
                    />
                  </td>
                  <td>{recipes.price} $</td>
                  <td>{recipes.description}</td>
                  <td>{recipes.tag.id}</td>
                  <td>{recipes.category[0]?.name}</td>
                  <td>
                    <i
                      className="fa fa-trash text-danger me-4"
                      onClick={() => handleShow(recipes.id)}
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-edit text-warning"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
