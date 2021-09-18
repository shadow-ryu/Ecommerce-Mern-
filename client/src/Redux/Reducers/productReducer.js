import {
  FETCH_ALL,
  CREATE,
  START_LOADING,
  SELLERPRODUCTS,
  BYID,
  END_LOADING,
  UPDATE,
  DELETE,
} from "../../constants/ActionTypes";
const productReducers = (state = { isLoading: true, product: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        products: action.payload.data,
      };
    case CREATE:
      return { ...state, products: [...state.products, action.payload] };
    case SELLERPRODUCTS:
      return {
        ...state,
        products: action.payload.data,
      };

    case BYID:
      return { ...state, product: action.payload.product };
    case UPDATE:
      console.log(action.payload.id);
      return {
        ...state,

        products: state.products.map((product) =>
          product._id === action.payload?.id ? action.payload : product
        ),
      };
    case DELETE:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default productReducers;
