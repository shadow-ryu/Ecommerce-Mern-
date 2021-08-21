import {
  FETCH_ALL,
  CREATE,
  SELLERPRODUCTS,
  BYID,
  UPDATE,
  DELETE,
  LIKE,
} from "../../constants/ActionTypes";
import * as api from "../../api/api.js";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.createP(product);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const fetchsellerProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMyProducts();

    dispatch({ type: SELLERPRODUCTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getproduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchProduct(id);

    dispatch({ type: BYID, payload: { product: data } });
  } catch (error) {
    console.log(error);
  }
};

export const updateProductById = (id, post, router) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(id, post);
    router.push("/admin");

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await await api.deleteProduct(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
