const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  tokenValue: ""
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case "auth/login":
      return { ...state, isAuthenticated: true, tokenValue: action.payload };

    case "auth/logout":
      return { ...state, isAuthenticated: false, tokenValue: action.payload };

    default:
      return state;
  }
}
