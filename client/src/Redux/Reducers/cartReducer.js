import {
  START_LOADING,
  END_LOADING,
  ADDTOCART,
  // REMOVEFROMCART,
  GETCART,
} from "../../constants/ActionTypes";
const cartReducers = (state = { isLoading: true, cart: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case GETCART:
      return {
        ...state,
        carts: action.payload.data[0],
      };

    case ADDTOCART:
      return { ...state, cart: [...state.cart, action.payload] };

    default:
      return state;
  }
};
export default cartReducers;
