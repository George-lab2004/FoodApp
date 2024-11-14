import { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import axios from "axios";
import ConfirmDelete from "../../../shared/Components/ConfrimDelete/ConfirmDelete";
import { toast } from "react-toastify";
import NoData from "../../../shared/Components/NoData/NoData";
import { axiosInstance, CATEGORY_URLS } from "../../../../services/urls/urls";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORY, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(CATEGORY_URLS.DELETE_CATEGORY(selectedId)),
        toast.success("Deleted sucessfully");

      setShow(false);
      getCategories(); // Refresh categories list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        title="Categories List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <ConfirmDelete
        show={show}
        deleteItem="Category"
        deleteFun={handleDelete}
        toggleShow={() => setShow(false)}
      />
      <div className="d-flex justify-content-between">
        <div className="flex-column ms-2 ">
          <h3 className="Poppins mt-2">Categories Table Details</h3>
          <p className="poppins">You can check all details</p>
        </div>

        <button className="btn btn-success m-2 fw-bold fs-5 h-25">
          Add New Category
        </button>
      </div>
      <div className="p-4">
        {loading ? (
          <div className="loader mx-auto"></div>
        ) : categoriesList.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Creation Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoriesList.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.creationDate}</td>
                    <td>
                      <i
                        className="fa fa-trash text-danger me-4"
                        onClick={() => handleShow(category.id)}
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
          </div>
        ) : (
          <NoData />
        )}
      </div>
      ={" "}
    </>
  );
}
