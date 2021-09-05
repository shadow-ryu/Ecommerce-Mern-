import {
  START_LOADING,
  END_LOADING,
  SELLERORDERS,
  // REMOVEFROMCART,
  PLACEORDER,
  SUCESS_FULLY,
} from "../../constants/ActionTypes";
const OrderReducers = (
  state = { isLoading: true, sucessOrder: false, Order: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case SUCESS_FULLY:
      return { ...state, sucessOrder: true };
    case PLACEORDER:
      return state;

    case SELLERORDERS:
      return {
        ...state,
        Order: action.payload.data,
      };

    default:
      return state;
  }
};
export default OrderReducers;
