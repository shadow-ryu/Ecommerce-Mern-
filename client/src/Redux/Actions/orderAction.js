import { START_LOADING, END_LOADING } from "../../constants/ActionTypes";
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
