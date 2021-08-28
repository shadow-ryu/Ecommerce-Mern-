import {
  START_LOADING,
  ADDTOCART,
  REMOVEFROMCART,
  END_LOADING,
  GETCART,
} from "../../constants/ActionTypes";
import * as api from "../../api/api.js";
export const addProductToCart = (id, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.addtoCart(id);
    router.push("/mycart");
    dispatch({ type: ADDTOCART, payload: { data } });
  } catch (error) {
    console.log(error);
  }
};

export const removeProductToCart = (id, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.removetoCart(id);

    dispatch({ type: REMOVEFROMCART, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const userCart = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getuserCart();

    dispatch({ type: GETCART, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
