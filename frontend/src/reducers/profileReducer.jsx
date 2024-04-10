import {
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL
  } from '../constants/profileConstants';
<<<<<<< HEAD

=======
  
>>>>>>> bb486b4d826fa9bceede0a1467e733cf001ff7aa
  const initialState = {
    loading: false,
    userData: null,
    error: null
  };
<<<<<<< HEAD


=======
  
>>>>>>> bb486b4d826fa9bceede0a1467e733cf001ff7aa
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
>>>>>>> bb486b4d826fa9bceede0a1467e733cf001ff7aa
