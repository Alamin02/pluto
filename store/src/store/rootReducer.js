import { combineReducers } from "redux";

import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { fileReducer } from "./fileReducer";
import { settingsReducer } from "./settingsReducer";

export default combineReducers({
  cart: cartReducer,
  auth: authReducer,
  file: fileReducer,
  settings: settingsReducer,
});
