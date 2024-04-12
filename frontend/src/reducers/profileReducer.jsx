import {
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL
  } from '../constants/profileConstants';
<<<<<<< HEAD

=======
>>>>>>> 83e53c8324ce41d826660b7ab45948661995f296
  const initialState = {
    loading: false,
    userData: null,
    error: null
  };
<<<<<<< HEAD


=======
>>>>>>> 83e53c8324ce41d826660b7ab45948661995f296
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
<<<<<<< HEAD
  
=======
  
>>>>>>> 83e53c8324ce41d826660b7ab45948661995f296
