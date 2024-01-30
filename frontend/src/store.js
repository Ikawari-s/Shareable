import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; 
import { userLoginReducer } from './reducers/userReducer';
import { userRegisterReducer } from './reducers/registerReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
JSON.parse(localStorage.getItem("key") || '{}')

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;