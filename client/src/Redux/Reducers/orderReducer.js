import {
  START_LOADING,
  END_LOADING,
  SELLERORDERS,
  // REMOVEFROMCART,
  PLACEORDER,
} from "../../constants/ActionTypes";
const OrderReducers = (state = { isLoading: true, Order: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case PLACEORDER:
      return {
        ...state,
        Order: action.payload.data,
      };

    case SELLERORDERS:
      console.log(action.payload.data);
      return {
        ...state,
        Order: action.payload.data,
      };

    default:
      return state;
  }
};
export default OrderReducers;
