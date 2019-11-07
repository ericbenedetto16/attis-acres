import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import postsReducer from './postsReducer';
import pagesReducer from './pagesReducer';
import productsReducer from './productsReducer';
import loadingReducer from './loadingReducer';
import navReducer from './navReducer';
import headerPhotoReducer from './headerPhotoReducer';

const allReducers = combineReducers({
  header_photo: headerPhotoReducer,
  menu: menuReducer,
  toggleNav: navReducer,
  posts: postsReducer,
  pages: pagesReducer,
  products: productsReducer,
  loading: loadingReducer,
});

export default allReducers;
