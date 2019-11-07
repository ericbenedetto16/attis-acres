const dataReducer = (state = [{ title: { rendered: 'Loading...' } }], action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.payload;
    default:
      return state;
  }
};

export default dataReducer;
