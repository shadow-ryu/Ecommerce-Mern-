import { combineReducers } from "redux";

import authReducers from "./authReducer";
import productReducers from "./productReducer";
import cartReducer from "./cartReducer";
import addressReducers from "./UserAddressReducer";
import newAddressReducer from "./addressReducer";
import savePaynetMethodReducer from "./paymentMethodReducer";
import OrderReducers from "./orderReducer";

const reducers = combineReducers({
  authReducers,
  productReducers,
  cartReducer,
  addressReducers,
  savePaynetMethodReducer,
  OrderReducers,
  newAddressReducer,
});
export default reducers;
