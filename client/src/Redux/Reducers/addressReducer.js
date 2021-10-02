import {
  FETCH_ALL,
  CREATEA,
  START_LOADING,
  END_LOADING,
} from "../../constants/ActionTypes";
const newAddressReducer = (
  state = { isLoading: true, submited: false, newAddress: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case CREATEA:
      return {
        ...state,
        submited: true,
        newAddress: [...state.newAddress, action.payload],
      };

    default:
      return state;
  }
};
export default newAddressReducer;
