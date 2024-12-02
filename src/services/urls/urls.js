import axios from "axios";

export const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});
export const IMAGE_PATHS = "https://upskilling-egypt.com:3006";
export const IMAGE_URL = "https://upskilling-egypt.com:3006";

export const USERS_URLS = {
  LOGIN: `Users/Login`,
  FORGET_PASS: `Users/Reset/Request`,
  Reset_Pass: `/Users/Reset`,
  GET_USER: (id) => `/Users/${id}`,
  GET_USERS_LIST: "/Users",
  GET_Current_USERS_LIST: "current/Users",
  DELETE_USER: (id) => `/Users/${id}`,
  REGISTER: `/Users/Register`,
  VERIFY: `/Users/verify`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
};
// RECIPE_Urls'
export const RECIPE_URLS = {
  LIST: `Recipe`,
  DELETE_LIST: (id) => `/Recipe/${id}`,
  CREATE_LIST: `Recipe`,
  GET_LIST: (recipeId) => `/Recipe/${recipeId}`,
  UPDATE_RECIPE: (recipeId) => `/Recipe/${recipeId}`,
};
//  Categories
export const CATEGORY_URLS = {
  GET_CATEGORY: `Category`,
  DELETE_CATEGORY: (id) => `/Category/${id}`,
  Update_CATEGORY: (id) => `/Category/${id}`,
  CREATE_CATEGORY: `/Category`,
};

export const TAG_URLS = {
  GET_TAGS: `tag/`,
};
export const FAVORITES_URLS = {
  GET_FAVORITES: `/UserRecipe/`,
  ADD_FAVORITE: `/UserRecipe/`,
  DELETE_FAVORITE: (id) => `/UserRecipe/${id}`,
};
