const initialState = {
  image: localStorage.getItem("data") || "",
};

export function fileReducer(state = initialState, action) {
  switch (action.type) {
    case "user/profile":
      return {
        ...state,
        image: action.payload
      };

    default:
      return state;
  }
}
