import {
  START_LOADING,
  END_LOADING,
  SELLERORDERS,
  // REMOVEFROMCART,
  MYORDERS,
  SELLERORDERBYID,
  PLACEORDER,
  SUCESS_FULLY,
  UPDATEORD,
  ALLSELLER,
} from "../../constants/ActionTypes";
const OrderReducers = (
  state = { isLoading: true, sucessOrder: false, update: false, Order: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case SUCESS_FULLY:
      return { ...state, sucessOrder: true };
    case UPDATEORD:
      return { ...state, update: true, isLoading: false };
    case PLACEORDER:
      return state;
    case MYORDERS:
      return {
        ...state,
        Order: action.payload.data,
      };
    case SELLERORDERS:
      return {
        ...state,
        Order: action.payload.data,
      };

    case SELLERORDERBYID:
      return { ...state, Order: action.payload.data };

    default:
      return state;
  }
};
export default OrderReducers;
