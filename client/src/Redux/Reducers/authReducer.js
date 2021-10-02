import * as actionType from "../../constants/ActionTypes";

const authReducers = (
  state = { isLoading: true, authData: null, user: [] },
  action
) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.START_LOADING:
      return { ...state, isLoading: true };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };

    case actionType.END_LOADING:
      return { ...state, isLoading: false };
    case actionType.ALLSELLER:
      return {
        ...state,
        user: action.payload.data,
      };

    case actionType.ALLUSER:
      return {
        ...state,
        user: action.payload.data,
      };
    case actionType.DELETE:
      return {
        ...state,
        user: state.user.filter((u) => u._id !== action.payload),
      };
    default:
      return state;
  }
};
export default authReducers;
