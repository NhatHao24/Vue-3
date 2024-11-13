
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; 
import productReducer from './modules/product'; 
import userReducer from './modules/user'; 

const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) 
);

export default store;