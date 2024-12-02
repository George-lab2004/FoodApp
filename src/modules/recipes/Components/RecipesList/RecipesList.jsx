import { useContext, useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import ConfirmDelete from "../../../shared/Components/ConfrimDelete/ConfirmDelete";
import { toast } from "react-toastify";
import NoData from "../../../shared/Components/NoData/NoData";
import header from "../../../../assets/Header2.svg";

import {
  axiosInstance,
  CATEGORY_URLS,
  FAVORITES_URLS,
  IMAGE_PATHS,
  RECIPE_URLS,
  TAG_URLS,
} from "../../../../services/urls/urls";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

export default function RecipesList() {
  const { loginData } = useContext(AuthContext);
  const [RecipesList, setRecipesList] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [Tags, setTags] = useState([]);
  const [CategoriesList, setCategoriesList] = useState([]);
  const [nameValue, setnameValue] = useState("");

  const [tagValue, setTagsValue] = useState("");
  const [catValue, setCatValue] = useState("");

  const getRecipies = async (pageNo, PageSize, name, tagId, categoryId) => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(RECIPE_URLS.LIST, {
        params: {
          pageSize: PageSize,
          pageNumber: pageNo,
          name: name,
          tagId: tagId,
          categoryId: categoryId,
        },
      });
      console.log(response?.data + "THATS FOR RECIPES SIUUUU");

      // Dynamically setting pagination
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setRecipesList(response.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipies(1, 3);
    getTags();
    getCategories();
  }, []);

  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  const getNameValue = (input) => {
    setnameValue(input.target.value);
    getRecipies(1, 3, input.target.value);
  };
  const getTagValue = (input) => {
    setTagsValue(input.target.value);
    getRecipies(1, 3, nameValue, input.target.value, catValue);
  };
  const getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipies(1, 3, nameValue, tagValue, input.target.value);
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

  const addToFavorite = async (id) => {
    try {
      const { data } = await axiosInstance.post(FAVORITES_URLS.ADD_FAVORITE, {
        recipeId: id,
      });
      toast.success("Recipe is added to favorite sucsessfuly");
    } catch (error) {
      console.log(error);
    }
  };
  const getTags = async () => {
    try {
      const response = await axiosInstance.get(TAG_URLS.GET_TAGS);
      console.log(response);
      setTags(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORY);
      setCategoriesList(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        title="Recipies items"
        description="You can now add your items that any user can order it from the Application and you can edit"
        header={header}
      />
      <ConfirmDelete
        show={show}
        deleteItem="Recipe"
        deleteFun={handleDelete}
        closeModal={() => setShow(false)}
      />
      <div className="d-flex justify-content-between">
        <h3>Recipes Table Details</h3>

        {loginData?.userGroup != "SystemUser" ? (
          <Link
            to="/dashboard/recipes/recipe-form"
            className="btn btn-success m-3"
          >
            Add New Recipe
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="p-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search here..."
              className="form-control input"
              onChange={getNameValue}
            />
          </div>
          <div className="col-md-3">
            <select onChange={getTagValue} className="form-control input">
              <option value="">Tags</option>
              {Tags.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            {" "}
            <select onChange={getCatValue} className="form-control input">
              <option value="">Categories</option>
              {CategoriesList.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <div className="loader mx-auto"></div>
        ) : RecipesList.length > 0 ? (
          <div className="table-responsive">
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
                {RecipesList.map((recipes, index) => (
                  <tr key={recipes.id}>
                    <td
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#e2e5eb",
                      }}
                    >
                      {recipes.name}
                    </td>
                    <td
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#e2e5eb",
                      }}
                    >
                      <img
                        src={`${IMAGE_PATHS}/${recipes.imagePath}`}
                        alt={recipes.name}
                        className="w-25"
                      />
                    </td>
                    <td
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#e2e5eb",
                      }}
                    >
                      {recipes.price} $
                    </td>
                    <td
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#e2e5eb",
                      }}
                    >
                      {recipes.description}
                    </td>
                    <td
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#e2e5eb",
                      }}
                    >
                      {recipes.tag.id}
                    </td>
                    <td
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#e2e5eb",
                      }}
                    >
                      {recipes.category[0]?.name}
                    </td>
                    {loginData?.userGroup !== "SystemUser" ? (
                      <td
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9f9f9" : "#e2e5eb",
                        }}
                      >
                        <i
                          className="fa fa-trash me-3 text-danger"
                          onClick={() => handleShow(recipes.id)}
                        ></i>
                        <Link to={`/Dashboard/recipes/${recipes?.id}`}>
                          <i className="fa fa-edit text-warning"></i>
                        </Link>
                      </td>
                    ) : (
                      <td
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9f9f9" : "#e2e5eb",
                        }}
                      >
                        <i
                          className="fa fa-heart text-danger cursor"
                          onClick={() => addToFavorite(recipes.id)}
                        ></i>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>{" "}
          </div>
        ) : (
          <NoData />
        )}
      </div>
      <nav
        aria-label="Page navigation example"
        className="justify-content-center d-flex"
      >
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => getRecipies(1, 3)} // Navigate to the first page (or handle previous logic)
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {arrayOfPages.map((pageNo) => (
            <li
              // Highlight active page
              key={pageNo}
              onClick={() => getRecipies(pageNo, 3)}
            >
              <a className="page-link" href="#">
                {pageNo}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() => getRecipies(arrayOfPages.length, 3)} // Navigate to the last page (or handle next logic)
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
