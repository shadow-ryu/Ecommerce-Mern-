import {
  FETCH_ALL,
  CREATE,
  START_LOADING,
  END_LOADING,
} from "../../constants/ActionTypes";
const addressReducers = (state = { isLoading: true, address: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        address: action.payload.data,
      };
    case CREATE:
      return { ...state, address: [...state.address, action.payload] };

    default:
      return state;
  }
};
export default addressReducers;
