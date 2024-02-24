import {SHARER_FOLLOW_FAIL, SHARER_FOLLOW_REQUEST, SHARER_FOLLOW_SUCCESS} from "../constants/followConstants"



const initialState = {
    loading: false,
    error: null,
  };
  
  export const followReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHARER_FOLLOW_REQUEST:
        return { ...state, loading: true, error: null };
      case SHARER_FOLLOW_SUCCESS:
        return { ...state, loading: false, error: null };
      case SHARER_FOLLOW_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
