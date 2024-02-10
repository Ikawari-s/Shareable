import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Correct import statement for thunk middleware
import { userLoginReducer } from './reducers/userReducer';
import { userRegisterReducer } from './reducers/registerReducer';
import { userProfileReducer } from './reducers/profileReducer'; // Import the userProfileReducer
import {sharerListReducer} from './reducers/sharerReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  sharerList: sharerListReducer,
  // userProfile: userProfileReducer, // Add userProfileReducer to the combined reducers
});

const userInfoFromStorage = localStorage.getItem('userInfo')
JSON.parse(localStorage.getItem("key") || '{}')

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },

  // userProfile: { userProfileData: null },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

