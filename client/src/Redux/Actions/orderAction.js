import {
  START_LOADING,
  END_LOADING,
  SELLERORDERS,
} from "../../constants/ActionTypes";
import * as api from "../../api/api.js";

export const placeOrderFnc = (result, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.placOrder(result);

    dispatch({ type: END_LOADING });
    router.push("/sucessOrder");
  } catch (error) {
    console.log(error);
  }
};
export const fetchsellerOrders = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.sellerOrderList();
    console.log(data);
    dispatch({ type: SELLERORDERS, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
