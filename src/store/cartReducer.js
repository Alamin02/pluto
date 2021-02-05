const initialState = {
  products: [],
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "cart/addProduct":
      return [...state.products, action.payload];
    default:
        return state;
  }
}
