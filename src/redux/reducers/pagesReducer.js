const pagesReducer = (state = [{ title: { rendered: 'Loading...' } }], action) => {
  switch (action.type) {
    case 'SET_PAGES':
      return action.payload;
    default:
      return state;
  }
};

export default pagesReducer;
