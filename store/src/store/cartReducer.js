const initialState = {
  products: [],
  totalValue: 0,
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "cart/addProduct":
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex >= 0) {
        return state;
      }

      return { ...state, products: [...state.products, action.payload] };

    case "cart/removeProduct":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
