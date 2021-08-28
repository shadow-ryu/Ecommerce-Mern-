import {
  FETCH_ALL,
  PLACEORDER,
  START_LOADING,
  DELETE,
  END_LOADING,
} from "../../constants/ActionTypes";
import * as api from "../../api/api.js";

export const placeOrderFnc = (result) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.placOrder(result);

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
