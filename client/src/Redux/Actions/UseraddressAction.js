import {
  FETCH_ALL,
  START_LOADING,
  END_LOADING,
} from "../../constants/ActionTypes";
import * as api from "../../api/api.js";

export const getmyaddress = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.myadress();

    dispatch({ type: FETCH_ALL, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
