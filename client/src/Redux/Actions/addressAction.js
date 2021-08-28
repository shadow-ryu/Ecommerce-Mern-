import {
  CREATEA,
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
} from "../../constants/ActionTypes";
import * as api from "../../api/api.js";

export const savemyaddress = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    dispatch({ type: CREATEA, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
// export const getmyNewaddress = () => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING });

//     dispatch({ type: FETCH_ALL });
//     dispatch({ type: END_LOADING });
//   } catch (error) {
//     console.log(error);
//   }
// };
