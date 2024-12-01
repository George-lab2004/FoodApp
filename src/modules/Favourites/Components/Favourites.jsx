import { useEffect, useState } from "react";
import Header from "../../shared/Components/Header/Header";
import {
  axiosInstance,
  FAVORITES_URLS,
  IMAGE_PATHS,
} from "../../../services/urls/urls";
import NoData from "../../shared/Components/NoData/NoData";
import noDataImg from "./../../../assets/3.png";
import { toast } from "react-toastify";
export default function Favourites() {
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavorite = async () => {
    try {
      const { data } = await axiosInstance.get(
        FAVORITES_URLS.GET_FAVORITES,
        {}
      );
      console.log(data);
      setFavList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorite = async (id) => {
    setLoading(true);
    try {
      let response = await axiosInstance.delete(
        FAVORITES_URLS.DELETE_FAVORITE(id)
      );
      console.log(response);
      toast.success("item removed from favorite");
      getFavorite();
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFavorite();
  }, []);
  return (
    <>
      <Header
        title="Favorite Items"
        description="You can now add your items that any user can order from the Application and you can edit."
      />
      <div className="container my-5">
        {loading ? (
          <div className="loader mx-auto"></div>
        ) : (
          <div className="row gx-3 gy-3 px-2">
            {favList.length > 0 ? (
              favList.map((item, idx) => (
                <div
                  key={idx}
                  className="col-md-4 m-2 p-0 text-center fav-cart custom-column"
                  style={{
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#fff",
                    padding: "10px",
                  }}
                >
                  {item.recipe.imagePath ? (
                    <img
                      className="favImage"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px 10px 0 0",
                      }}
                      src={`${IMAGE_PATHS}/${item.recipe.imagePath}`}
                      alt={item.recipe.name}
                    />
                  ) : (
                    <img
                      className="nodataImg"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px 10px 0 0",
                      }}
                      src={noDataImg}
                      alt="No data available"
                    />
                  )}
                  <div className="item" style={{ padding: "15px" }}>
                    <h4 className="my-3">{item.recipe.name}</h4>
                    <p>{item.recipe.description}</p>
                  </div>
                  <i
                    className="fa fa-heart fa-regular"
                    style={{
                      color: "red",
                      fontSize: "20px",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => removeFromFavorite(item.id)}
                  ></i>
                </div>
              ))
            ) : (
              <NoData />
            )}
          </div>
        )}
      </div>
    </>
  );
}
