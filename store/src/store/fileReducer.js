const initialState = {
  imageId: ""
};

export function fileReducer(state = initialState, action) {
  switch (action.type) {
    case "user/profile":
      return {
        ...state,
        imageId: action.payload
      };

    default:
      return state;
  }
}
