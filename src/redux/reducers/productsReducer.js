const productsReducer = (state = [{ title: { rendered: 'Loading...' } }], action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.payload;
    default:
      return state;
  }
};

export default productsReducer;
