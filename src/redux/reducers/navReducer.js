const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV':
      return !action.payload;
    default:
      return state;
  }
};

export default loadingReducer;
