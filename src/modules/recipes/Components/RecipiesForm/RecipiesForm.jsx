import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  axiosInstance,
  CATEGORY_URLS,
  RECIPE_URLS,
  TAG_URLS,
} from "../../../../services/urls/urls";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function RecipesForm() {
  const params = useParams();
  const [CategoriesList, setCategoriesList] = useState([]);
  // const [isDataLoaded, setIsDataLoaded] = useState(false);
  // const initialValuesRef = useRef({});

  const [Tags, setTags] = useState([]);
  const navigate = useNavigate();
  const recipeId = params.recipeId;
  const isNewRecipe = recipeId == "new-recipe";
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    setValue,
    getValues,
  } = useForm({ mode: "onChange" });

  const onSubmitHandler = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key !== "recipeImage") {
        formData.append(key, data[key]);
      } else {
        formData.append("recipeImage", data?.[key]?.[0]);
      }
    }

    try {
      let response;

      if (!isNewRecipe) {
        response = await axiosInstance.put(
          `${RECIPE_URLS.UPDATE_RECIPE(recipeId)}`, // Append recipeId to the endpoint
          formData
        );
        // Perform POST action for creating a new recipe
      } else {
        // Perform PUT action for updating an existing recipe
        response = await axiosInstance.post(RECIPE_URLS.CREATE_LIST, formData);
      }

      // Navigate to the recipes dashboard after successful request
      navigate("/Dashboard/recipes");
      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error(error);
    }
  };
  // useEffect(() => {
  //   if (isDataLoaded) {
  //     initialValuesRef.current = getValues();
  //   }
  // }, [getValues, isDataLoaded]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const tagsResponse = await axiosInstance.get(TAG_URLS.GET_TAGS);
        setTags(tagsResponse?.data);

        // if (!isNewRecipe) {
        //   const recipeResponse = await axiosInstance.get(
        //     RECIPE_URLS.GET_LIST(recipeId)
        //   );
        //   const recipe = recipeResponse?.data;
        //   setValue("name", recipe?.name || "");
        //   setValue("description", recipe?.description || "");
        //   setValue("price", recipe?.price || "");
        //   setValue("categoriesIds", recipe?.categoriesId?.[0]?.id || "");
        //   setValue("tagId", recipe?.tagId?.id || "");
        // }
      } catch (error) {
        console.log(error);
      }
    };
    const getCategories = async () => {
      try {
        const categoriesResponse = await axiosInstance.get(
          CATEGORY_URLS.GET_CATEGORY
        );

        setCategoriesList(categoriesResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    getTags();
    async () => {};
    if (recipeId != "new-recipe") {
      const getRecipe = async () => {
        const response = await axiosInstance.get(
          RECIPE_URLS.GET_LIST(recipeId)
        );
        console.log(response);
        const recipe = response?.data;
        setValue("name", recipe?.name || "");
        setValue("description", recipe?.description || "");
        setValue("price", recipe?.price || "");
        setValue("categoriesIds", recipe?.categoriesId?.[0]?.id || "");
        setValue("tagId", recipe?.tagId?.id || "");
      };
      getRecipe();
    }
  }, [recipeId, setValue, isNewRecipe]);

  return (
    <main>
      <header className="header-wrapper">
        <div className="content-wrapper">
          <h3 className="fw-bold">
            Fill the <span>Recipes</span>
          </h3>
          <p>
            You can now fill the meals easily using the table and form, click
            here and fill it with the table
          </p>
        </div>

        <Link to="/Dashboard/recipes" className="btn-primary text-white">
          All Recipes
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.9927 10.7075C20.9927 11.0168 20.8783 11.2827 20.6494 11.5054L14.5542 17.5913C14.4367 17.7088 14.313 17.7954 14.1831 17.8511C14.0532 17.9067 13.9202 17.9346 13.7842 17.9346C13.4749 17.9346 13.2214 17.8356 13.0234 17.6377C12.8255 17.446 12.7266 17.2048 12.7266 16.9141C12.7266 16.7656 12.7575 16.6265 12.8193 16.4966C12.875 16.3667 12.9523 16.2523 13.0513 16.1533L15.1294 14.0566L18.5156 10.9487L18.8867 11.5889L15.6118 11.7837H4.46045C4.13883 11.7837 3.87907 11.6847 3.68115 11.4868C3.47705 11.2889 3.375 11.0291 3.375 10.7075C3.375 10.3921 3.47705 10.1354 3.68115 9.9375C3.87907 9.73958 4.13883 9.64063 4.46045 9.64063L15.6118 9.64062L18.8867 9.83545L18.5156 10.4663L15.1294 7.36768L13.0513 5.271C12.9523 5.17204 12.875 5.05762 12.8193 4.92773C12.7575 4.79785 12.7266 4.65869 12.7266 4.51025C12.7266 4.21956 12.8255 3.97835 13.0234 3.78662C13.2214 3.5887 13.4749 3.48975 13.7842 3.48975C14.0625 3.48975 14.3161 3.60107 14.5449 3.82373L20.6494 9.91895C20.8783 10.1354 20.9927 10.3983 20.9927 10.7075Z"
              fill="white"
            />
          </svg>
        </Link>
      </header>

      <form onSubmit={handleSubmit(onSubmitHandler)} className="font-wrappers">
        <div className="input-wrapper">
          <input
            {...register("name", { required: "This field is required" })}
            className="form-control"
            placeholder="Recipe Name"
          />
          {errors.name?.message && (
            <div className="text-danger">{errors.name.message}</div>
          )}
        </div>

        <div className="input-wrapper">
          <select
            {...register("tagId", { required: "This field is required" })}
            className="form-control"
          >
            <option value="">Tag</option>
            {Tags.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {errors.tagId?.message && (
            <div className="text-danger">{errors.tagId.message}</div>
          )}
        </div>

        <div className="input-wrapper">
          <input
            {...register("price", { required: "This field is required" })}
            className="form-control"
            placeholder="Price"
          />
          {errors.price?.message && (
            <div className="text-danger">{errors.price.message}</div>
          )}
        </div>

        <div className="input-wrapper">
          <select
            {...register("categoriesIds", {
              required: "This field is required",
            })}
            className="form-control"
          >
            <option value="">Category</option>
            {CategoriesList.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {errors.categoriesIds?.message && (
            <div className="text-danger">{errors.categoriesIds.message}</div>
          )}
        </div>

        <div className="input-wrapper">
          <textarea
            {...register("description", { required: "This field is required" })}
            placeholder="Description"
            className="form-control"
          ></textarea>
          {errors.description?.message && (
            <div className="text-danger">{errors.description.message}</div>
          )}
        </div>

        <div className="input-wrapper">
          <input
            {...register("recipeImage")}
            type="file"
            className="form-control"
          />
          {errors.recipeImage?.message && (
            <div className="text-danger">{errors.recipeImage.message}</div>
          )}
        </div>

        <div className="d-flex justify-content-end">
          <Link to="/Dashboard/recipes" className="btn-primary mx-3 text-white">
            Cancel
          </Link>
          <button className="btn-primary text-white" disabled={isSubmitting}>
            {isSubmitting ? "Saving" : "Save"}
          </button>
        </div>
      </form>
    </main>
  );
}
