import {
  START_LOADING,
  END_LOADING,
  ADDTOCART,
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
        Order: action.payload.data[0],
      };

    //   case ADDTOCART:
    //     return { ...state, cart: [...state.cart, action.payload] };

    default:
      return state;
  }
};
export default OrderReducers;
