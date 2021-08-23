import { combineReducers } from "redux";

import authReducers from "./authReducer";
import productReducers from "./productReducer";
import cartReducer from "./cartReducer";

const reducers = combineReducers({
  authReducers,
  productReducers,
  cartReducer,
});
export default reducers;
