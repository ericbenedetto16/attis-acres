import { createStore } from 'redux';
import allReducers from './reducers';
import initializeStore from './utils/initializeStore';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

initializeStore();

export default store;
