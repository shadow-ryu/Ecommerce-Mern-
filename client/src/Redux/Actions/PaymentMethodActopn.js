import {
  SAVE,
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
} from "../../constants/ActionTypes";

export const savemypaymentMethod = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    dispatch({ type: SAVE, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
