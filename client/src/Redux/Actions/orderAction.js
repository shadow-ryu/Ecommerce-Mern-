import {
  SUCESS_FULLY,
  END_LOADING,
  SELLERORDERS,
  SELLERORDERBYID,
  START_LOADING,
  UPDATEORD,
  MYORDERS,
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
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.myOrderList();

    dispatch({ type: SELLERORDERS, payload: { data } });
    dispatch({ type: END_LOADING });
    //
  } catch (error) {
    console.log(error);
  }
};
export const fetchsellerOrders = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.sellerOrderList();

    dispatch({ type: SELLERORDERS, payload: { data } });
    dispatch({ type: END_LOADING });
    //
  } catch (error) {
    console.log(error);
  }
};
export const fetchsellerOrderById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.sellerOrderById(id);

    dispatch({ type: SELLERORDERBYID, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const updatellerOrderById = (id, order, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateSellerOrderById(id, order);
    router.push("/admin/orders");
  } catch (error) {
    console.log(error);
  }
};
export const fd = (id, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updatemyOrderById(id);
    router.push("/");
    router.push("/myOrder");
  } catch (error) {
    console.log(error);
  }
};
// export const updatemyOrderById = (id, router) => async (dispatch) => {

// };
