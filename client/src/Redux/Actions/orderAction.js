import {
  SUCESS_FULLY,
  END_LOADING,
  SELLERORDERS,
  START_LOADING,
} from "../../constants/ActionTypes";
import * as api from "../../api/api.js";
import { toast } from "react-toastify";

export const placeOrderFnc = (result, router) => async (dispatch) => {
  try {
    const { data } = await api.placOrder(result);

    dispatch({ type: SUCESS_FULLY });
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
