export function settingsReducer(state = {}, action) {
  switch (action.type) {
    case "settings/update":
      return { ...action.payload };
    default:
      return state;
  }
}
