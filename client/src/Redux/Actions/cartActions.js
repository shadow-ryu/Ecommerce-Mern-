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

    dispatch({ type: ADDTOCART, payload: { data } });
    router.push("/mycart");
    dispatch({ type: END_LOADING });
    router.push("/");
    window.location.reload(false);
  } catch (error) {
    alert(error);
  }
};

export const removeProductToCart = (id, router, buy) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.removetoCart(id);
    router.push("/");
    dispatch({ type: REMOVEFROMCART, payload: data });
    if (buy) {
      router.push("/buyNow");
    } else {
      router.push("/mycart");
    }
  } catch (error) {
    alert(error);
  }
};

export const userCart = (router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getuserCart();

    dispatch({ type: GETCART, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    alert(error);
  }
};

export const buyNow = (id, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.addtoCart(id);
    console.log(data);
    dispatch({ type: ADDTOCART, payload: { data } });
    router.push("/mycart");
    dispatch({ type: END_LOADING });
    router.push("/buyNow");
  } catch (error) {
    alert(error);
  }
};
