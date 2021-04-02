const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case "auth/login":
      return { ...state, isAuthenticated: true };

    case "auth/logout":
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
}
