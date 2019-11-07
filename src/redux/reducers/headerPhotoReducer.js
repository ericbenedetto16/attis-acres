const headerPhotoReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_HEADER_PHOTO':
      return action.payload;
    default:
      return state;
  }
};

export default headerPhotoReducer;
