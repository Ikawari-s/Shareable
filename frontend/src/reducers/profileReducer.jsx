import {
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL
  } from '../constants/profileConstants';
  
  const initialState = {
    loading: false,
    userData: null,
    error: null
  };
  
  export const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
      case USER_PROFILE_SUCCESS:
        return { ...state, loading: false, userData: action.payload };
      case USER_PROFILE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
