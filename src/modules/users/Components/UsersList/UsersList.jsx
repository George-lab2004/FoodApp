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

export default function UsersList({ loginData }) {
  const [loading, setLoading] = useState(false);
  const [usersList, setusersList] = useState([]);
  const [show, setShow] = useState(false);

  const [arrayOfPages, setArrayOfPages] = useState([]);
  const getUsers = async (pageNo, PageSize) => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(USERS_URLS.GET_USERS_LIST, {
        params: { pageSize: PageSize, pageNumber: pageNo },
      });
      console.log(response?.data + "THATS FOR Users SIUUUU");
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setusersList(response?.data?.data);
    } catch (error) {
      setLoading(false);

      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Header
        title={`users List`}
        description={
          "You can now add your items that any user can order it from the Application and you can edit v "
        }
      />
      <div className="d-flex justify-content-between">
        <h3 className="ms-3">Users Table Details</h3>
        <Link to="user/new-recipe" className="btn btn-success m-3">
          Add New User
        </Link>
      </div>
      <div>
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
                    <td>{user.phoneNumber} </td>
                    <td>{user.email}</td>

                    <td>{user.country}</td>
                    <td>
                      <i
                        className="fa fa-trash text-danger me-4"
                        aria-hidden="true"
                      ></i>

                      <i className="fa fa-eye " aria-hidden="true"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </div>
        <nav
          aria-label="Page navigation example"
          className="justify-content-center d-flex"
        >
          <ul className="pagination">
            {/* Previous Button */}
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => getUsers(1, 3)} // Go to the first page
              >
                &laquo;
              </a>
            </li>

            {/* First 8 Pages */}
            {arrayOfPages.slice(0, 8).map((pageNo) => (
              <li key={pageNo} className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => getUsers(pageNo, 3)}
                >
                  {pageNo}
                </a>
              </li>
            ))}

            {/* Next Button */}
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => getUsers(8, 3)} // Go to the 8th page (or handle custom logic)
              >
                &raquo;
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
