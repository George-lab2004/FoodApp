import { Link } from "react-router-dom";
import Header from "../../../shared/Components/Header/Header";
import { useEffect, useState } from "react";
import NoData from "../../../shared/Components/NoData/NoData";
import noData2 from "../../../../assets/noData.svg";
import {
  axiosInstance,
  IMAGE_PATHS,
  USERS_URLS,
} from "../../../../services/urls/urls";
import { toast } from "react-toastify";
import ConfirmDelete from "../../../shared/Components/ConfrimDelete/ConfirmDelete";

export default function UsersList() {
  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [show, setShow] = useState(false);
  const [selecteId, setSelectedId] = useState(null);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(5); // Set a limit for visible page numbers

  const getUsers = async (pageNo = 1, pageSize = 3) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(USERS_URLS.GET_USERS_LIST, {
        params: { pageSize: pageSize, pageNumber: pageNo },
      });
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setUsersList(response?.data?.data);
      setCurrentPage(pageNo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleShow = (id) => {
    setShow(true);
    setSelectedId(id);
  };
  const handleClose = () => setShow(false);

  let deleteUser = async () => {
    try {
      const response = await axiosInstance.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${selecteId}`
      );
      console.log(response?.data?.data);
      toast.success("User deleted successfully");
      handleClose();
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const generatePagination = () => {
    const start = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
    const end = Math.min(start + pageLimit - 1, arrayOfPages.length);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      <Header
        title="Users List"
        description="Manage users and view their details"
      />
      <ConfirmDelete
        show={show}
        deleteItem="User"
        deleteFun={deleteUser}
        closeModal={() => setShow(false)}
      />

      <div className="d-flex justify-content-between">
        <h3 className="ms-3">Users Table Details</h3>
        <Link to="user/new-recipe" className="btn btn-success m-3">
          Add New User
        </Link>
      </div>
      <div className="p-4">
        {loading ? (
          <div className="loader mx-auto"></div>
        ) : usersList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Country</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>
                    {user.imagePath ? (
                      <img
                        src={`${IMAGE_PATHS}/${user.imagePath}`}
                        alt={user.name}
                        className="w-25"
                      />
                    ) : (
                      <img className="w-25" src={noData2} alt={user.name} />
                    )}
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>
                    <i
                      className="fa fa-trash text-danger me-4"
                      aria-hidden="true"
                      onClick={() => handleShow(user.id)}
                    ></i>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>

      {/* Pagination */}
      <nav
        aria-label="Page navigation example"
        className="justify-content-center d-flex"
      >
        <ul className="pagination">
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => currentPage > 1 && getUsers(currentPage - 1)}
            >
              &laquo;
            </a>
          </li>

          {/* Page Numbers */}
          {generatePagination().map((pageNo) => (
            <li
              key={pageNo}
              className={`page-item ${pageNo === currentPage ? "active" : ""}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => getUsers(pageNo)}
              >
                {pageNo}
              </a>
            </li>
          ))}

          {/* Ellipsis */}
          {arrayOfPages.length > pageLimit &&
            currentPage + pageLimit < arrayOfPages.length && (
              <li className="page-item">
                <span className="page-link">...</span>
              </li>
            )}

          {/* Next Button */}
          <li
            className={`page-item ${
              currentPage === arrayOfPages.length ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() =>
                currentPage < arrayOfPages.length && getUsers(currentPage + 1)
              }
            >
              &raquo;
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
