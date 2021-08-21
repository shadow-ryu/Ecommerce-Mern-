import { combineReducers } from 'redux';


import authReducers from './authReducer';
import productReducers from './productReducer';

 const reducers = combineReducers({authReducers, productReducers});
 export default reducers;