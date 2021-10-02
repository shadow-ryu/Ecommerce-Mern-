import {
  CREATEA,
  START_LOADING,
  END_LOADING,
} from "../../constants/ActionTypes";

export const savemyaddress = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    dispatch({ type: CREATEA, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    alert(error);
  }
};
// export const getmyNewaddress = () => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING });

//     dispatch({ type: FETCH_ALL });
//     dispatch({ type: END_LOADING });
//   } catch (error) {
//      alert(error);;
//   }
// };
