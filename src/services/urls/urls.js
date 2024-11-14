import axios from "axios";

export const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

export const USERS_URLS = {
  LOGIN: `Users/Login`,
  FORGET_PASS: `Users/Reset/Request`,
  Reset_Pass: `/Users/Reset`,
  GET_USER: (id) => `/Users/${id}`,
};
// RECIPE_Urls'
export const RECIPE_URLS = {
  LIST: `Recipe/?pageSize=10&pageNumber=1`,
};
//  Categories
export const CATEGORY_URLS = {
  GET_CATEGORY: `Category/?pageSize=10&pageNumber=1`,
  DELETE_CATEGORY: (id) => `/Category/${id}`,
};
