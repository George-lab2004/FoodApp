import { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import ConfirmDelete from "../../../shared/Components/ConfrimDelete/ConfirmDelete";
import { toast } from "react-toastify";
import NoData from "../../../shared/Components/NoData/NoData";
import { axiosInstance, CATEGORY_URLS } from "../../../../services/urls/urls";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

export default function CategoriesList() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const getCategories = async (pageNo, PageSize) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORY, {
        params: { pageSize: PageSize, pageNumber: pageNo },
      });
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
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
  const handleShowUpdate = (id) => {
    const category = categoriesList.find((cat) => cat.id === id);
    setSelectedId(id);
    setSelectedCategory(category); // Set the category data to be updated
    setShowUpdate(true);
    // Pre-fill the form with the current category's data
    setValue("name", category.name);
  };

  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handlecloseAdd = () => {
    setShowAdd(false);
  };
  const handlecloseUpdate = () => {
    setShowUpdate(false);
  };
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(CATEGORY_URLS.DELETE_CATEGORY(selectedId));
      toast.success("Deleted successfully");
      setShow(false);
      getCategories(); // Refresh categories list after deletion
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await axiosInstance.put(CATEGORY_URLS.Update_CATEGORY(selectedId), data);
      toast.success("Updated successfully");
      setShowUpdate(false);
      getCategories(); // Refresh categories list after update
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.post(CATEGORY_URLS.CREATE_CATEGORY, data);
      toast.success("Added successfully");
      getCategories();
      handlecloseAdd();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Categories List"
        description="You can now add your items that any user can order from the Application, and you can edit them"
      />
      <ConfirmDelete
        show={show}
        deleteItem="Category"
        deleteFun={handleDelete}
        closeModal={() => setShow(false)}
      />
      <Modal show={showAdd} onHide={handlecloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Category Name"
                aria-label="name"
                aria-describedby="basic-addon1"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
            <button
              className="btn btn-success w-100 rounded rounded-2"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showUpdate} onHide={handlecloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Category Name"
                aria-label="name"
                aria-describedby="basic-addon1"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
            <button
              className="btn btn-success w-100 rounded rounded-2"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="d-flex justify-content-between">
        <div className="flex-column ms-2">
          <h3 className="Poppins mt-2 ms-5">Categories Table Details</h3>
          <p className="poppins ms-5">You can check all details</p>
        </div>

        <button
          onClick={handleShowAdd}
          className="btn btn-success m-2 fw-bold fs-5 h-25"
        >
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
                        onClick={() => handleShowUpdate(category.id)}
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
              onClick={() => getCategories(1, 3)} // Navigate to the first page (or handle previous logic)
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {arrayOfPages.map((pageNo) => (
            <li
              // Highlight active page
              key={pageNo}
              onClick={() => getCategories(pageNo, 3)}
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
              onClick={() => getCategories(arrayOfPages.length, 3)} // Navigate to the last page (or handle next logic)
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
