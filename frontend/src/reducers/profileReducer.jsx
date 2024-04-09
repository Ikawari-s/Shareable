import {
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL
  } from '../constants/profileConstants';
<<<<<<< HEAD
  
=======

>>>>>>> bf75d7074feeafd0e89f536c38d83d43ccfca557
  const initialState = {
    loading: false,
    userData: null,
    error: null
  };
<<<<<<< HEAD
  
=======

>>>>>>> bf75d7074feeafd0e89f536c38d83d43ccfca557
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
<<<<<<< HEAD
  };
  
=======
  };
>>>>>>> bf75d7074feeafd0e89f536c38d83d43ccfca557
