const initialState = {
  products: JSON.parse(localStorage.getItem('productList')) || "[]",
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

      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };

    case "cart/removeProduct":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };

    case "cart/updateQuantity":
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.productId) {
            return {
              ...product,
              quantity: action.payload.quantity,
            };
          }
          return product;
        }),
      };
    default:
      return state;
  }
}
