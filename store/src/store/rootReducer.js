import { combineReducers } from "redux";

import { cartReducer } from "./cartReducer";
import incrementDecrementReducer from "./incrementDecrementReducer";

export default combineReducers({
  cart: cartReducer,
  update: incrementDecrementReducer,
});
