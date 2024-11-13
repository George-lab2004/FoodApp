import { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import axios from "axios";
import ConfirmDelete from "../../../shared/Components/ConfrimDelete/ConfirmDelete";
import { toast } from "react-toastify";

export default function RecipesList() {
  const [RecipesList, setRecipesList] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRecipies = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
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
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${selectedId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success("Deleted sucessfully");

      setShow(false);
      getRecipies();
    } catch (error) {
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
        toggleShow={() => setShow(false)}
      />
      <div className="d-flex justify-content-between">
        <h3>Recipes Table Details</h3>
        <button className="btn btn-success m-3">Add New Recipe</button>
      </div>
      <div className="p-4">
        {loading ? (
          <div className="loader mx-auto"></div>
        ) : (
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
              {RecipesList.map((Recipes) => (
                <tr key={Recipes.id}>
                  <td>{Recipes.name}</td>
                  <td>
                    <img
                      src={`https://upskilling-egypt.com:3006/${Recipes.imagePath}`}
                      alt={Recipes.name}
                      className="w-25"
                    />
                  </td>

                  <td>{Recipes.price} $</td>
                  <td>{Recipes.description}</td>
                  <td>{Recipes.tag.id}</td>
                  <td>{Recipes.category}</td>

                  <td>
                    <i
                      className="fa fa-trash text-danger me-4"
                      onClick={() => handleShow(Recipes.id)}
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
        )}
      </div>
    </>
  );
}
