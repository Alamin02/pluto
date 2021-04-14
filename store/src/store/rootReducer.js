import { combineReducers } from "redux";

import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer"
import { fileReducer } from "./fileReducer"

export default combineReducers({
  cart: cartReducer,
  auth: authReducer,
  file: fileReducer,
});
