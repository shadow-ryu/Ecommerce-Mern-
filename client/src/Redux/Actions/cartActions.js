import {
  START_LOADING,
  ADDTOCART,
  REMOVEFROMCART,
} from "../../constants/ActionTypes";
import * as api from "../../api/api.js";
export const addProductToCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.addtoCart(id);

    dispatch({ type: ADDTOCART, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeProductToCart = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.removetoCart();

    dispatch({ type: REMOVEFROMCART, payload: data });
  } catch (error) {
    console.log(error);
  }
};
