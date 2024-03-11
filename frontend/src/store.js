import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Correct import statement for thunk middleware
import { CommentPostReducer, DeleteCommentPostReducer, LikeCountReducer, LikePostReducer, ListCommentPostReducer, UnlikePostReducer, UserProfileUpdateReducer, likesCountReducer, userChangePasswordReducer, userLoginReducer, } from './reducers/userReducer';
import { userRegisterReducer, userResendOTPReducer, userSentOTPReducer, userVerifyOTPReducer } from './reducers/registerReducer';
import {sharerListReducer, myProfileReducer, CheckSharerReducer, SharerDetailReducer, userSharerBeReducer, userSharerPostReducer, SharerLatestPostReducer, SharerUserProfileUpdateReducer} from './reducers/sharerReducer';
import { sharerPostListReducer } from './reducers/sharerReducer';
import { followReducer, unfollowReducer, followedSharerListReducer } from './reducers/followReducer';
import { SharerUpdateProfile } from './actions/sharerActions';


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  sharerList: sharerListReducer,
  sharerPostList: sharerPostListReducer,
  myProfile: myProfileReducer,
  CheckerSharer: CheckSharerReducer,
  SharerDetail: SharerDetailReducer,
  // NEW
  UserVerifyOtp: userVerifyOTPReducer,
  UserSentOtp: userSentOTPReducer,
  UserResentOtp: userResendOTPReducer,
  UserSharerBe : userSharerBeReducer,
  UserSharerPost : userSharerPostReducer,
  SharerPostList : sharerPostListReducer,
  MyProfile : myProfileReducer,
  SharerLatestPost : SharerLatestPostReducer,
  followSharer : followReducer,
  // unfollowSharer :unfollowReducer,
  followedSharerList: followedSharerListReducer,
  Likepost : LikePostReducer,
  UnlikePost: UnlikePostReducer,
  CommentPost: CommentPostReducer,
  DeleteComment: DeleteCommentPostReducer,
  ListComment: ListCommentPostReducer,
  LikeCount : LikeCountReducer,
  UserProfileUpdate : UserProfileUpdateReducer,
  SharerUpdateProfile: SharerUserProfileUpdateReducer,
  userChangePassword : userChangePasswordReducer,
  


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

