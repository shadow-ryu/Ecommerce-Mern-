import {
  FETCH_ALL,
  CREATE,
  SELLERPRODUCTS,
  BYID,
  UPDATE,
  DELETE,
  LIKE,
} from "../../constants/ActionTypes";
const productReducers = (product = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...product, action.payload];
    case SELLERPRODUCTS:
      return action.payload;

    case BYID:
      return { ...product, product: action.payload.product };
    case UPDATE:
      return product.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
    case DELETE:
      return product.filter((p) => p._id !== action.payload);
    default:
      return product;
  }
};
export default productReducers;
