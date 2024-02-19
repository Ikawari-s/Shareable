import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Correct import statement for thunk middleware
import { userLoginReducer } from './reducers/userReducer';
import { userRegisterReducer } from './reducers/registerReducer';
import {sharerListReducer, myProfileReducer} from './reducers/sharerReducer';
import { sharerPostListReducer } from './reducers/sharerReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  sharerList: sharerListReducer,
  sharerPostList: sharerPostListReducer,
  myProfile: myProfileReducer,
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

