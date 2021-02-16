const initialState = {
  count: 1,
};
const incrementDecrementReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add": {
      return {
        count: state.count + 1,
      };
    }
    case "Remove": {
      if (state.count > 1) {
        return {
          count: state.count - 1,
        };
      }
      return state;
    }
    default:
      return state;
  }
};
export default incrementDecrementReducer;
