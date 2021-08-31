import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("profile")) {
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }

  // return req;
);
export const fetchProducts = () => API.get("/product");
export const loginIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const myadress = () => API.get("/user/address");
export const fetchProduct = (id) => API.get(`/product/${id}`);
export const fetchMyProducts = () => API.get("/user/MyProducts");
export const createP = (newProduct) => API.post("/product", newProduct);
export const updateProduct = (id, updatedPost) =>
  API.patch(`/product/${id}`, updatedPost);
export const deleteProduct = (id) => API.delete(`/product/${id}`);
export const addtoCart = (id) => API.get(`/product/${id}/addCart`);
export const removetoCart = (id) => API.get(`/product/${id}/removeCart`);
export const getuserCart = () => API.get("/cart");
export const placOrder = (formData) => API.post("order", formData);
export const sellerOrderList = () => API.get("/user/sellerOrders");
