import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Correct import statement for thunk middleware
import { CommentPostReducer, DeleteCommentPostReducer, LikeCountReducer, LikePostReducer, ListCommentPostReducer, UnlikePostReducer, UserProfileUpdateReducer, likesCountReducer, userChangePasswordReducer, userLoginReducer, userSendPasswordReducer, } from './reducers/userReducer';
import { userRegisterReducer, userResendOTPReducer, userSentOTPReducer, userVerifyOTPReducer } from './reducers/registerReducer';
import {sharerListReducer, myProfileReducer, CheckSharerReducer, SharerDetailReducer, userSharerBeReducer, userSharerPostReducer, SharerLatestPostReducer, SharerUserProfileUpdateReducer, sharerRatingsReducer, sharerEditPostReducer, sharerPostCountReducer, sharerPreviewReducer, sharerPreviewListReducer, userTipBoxReducer, dashboardReducer, topDonorReducer} from './reducers/sharerReducer';
import { sharerPostListReducer } from './reducers/sharerReducer';
import { followReducer, unfollowReducer, followedSharerListReducer, followExpirationReducer } from './reducers/followReducer';
import { SharerUpdateProfile, deleteSharerRatings, fetchSharerRatings, patchSharerRatings, sharerDeletePost } from './actions/sharerActions';
import { tier1FollowedSharersReducer, tier2FollowedSharersReducer, tier3FollowedSharersReducer } from './reducers/subscriptionReducer';
import {contactReducers} from './reducers/contactReducers'; 
import { adminContactsReducer, adminDeleteContactsReducer, adminUserReducer, createUserAdminReducer, searchSharerReducer, searchUserReducer, sentSharerIncomeAdminReducer, sharerIncomeAdminReducer, updateUserAdminReducer } from './reducers/adminReducers';
import { userProfileReducer } from './reducers/profileReducer';



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
  sharerDelete : sharerDeletePost,
  fetchRating : fetchSharerRatings,
  sharerRating : sharerRatingsReducer,
  deleteRating : deleteSharerRatings,
  patchRating : patchSharerRatings,
  sharerEditPost : sharerEditPostReducer,
  sharerPostCount : sharerPostCountReducer,
  sharerPreview : sharerPreviewReducer,
  sharerPreviewList: sharerPreviewListReducer,
  userTipBoxes : userTipBoxReducer,
  dashboard : dashboardReducer,
  topDonor : topDonorReducer,
  tier1List : tier1FollowedSharersReducer,
  tier2List : tier2FollowedSharersReducer,
  tier3List : tier3FollowedSharersReducer,
  userAdmin : adminUserReducer,
  createUserAdmin : createUserAdminReducer,
  updateUserAdmin : updateUserAdminReducer,
  sharerIncomeAdmin : sharerIncomeAdminReducer,
  sentSharerIncome : sentSharerIncomeAdminReducer,
  userProfile : userProfileReducer,
  userSendPassword :userSendPasswordReducer,
  searchUser : searchUserReducer,
  searchSharer : searchSharerReducer,
  contact : contactReducers,
  adminContacts : adminContactsReducer,
  adminDeleteContacts : adminDeleteContactsReducer,
  followExpiration : followExpirationReducer

});


const editedPostsFromStorage = JSON.parse(localStorage.getItem('editedPosts') || '{}');

const userInfoFromStorage = localStorage.getItem('userInfo')
JSON.parse(localStorage.getItem("key") || '{}')

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  editedPosts: editedPostsFromStorage, 
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}).concat(thunk),
});

export default store;

