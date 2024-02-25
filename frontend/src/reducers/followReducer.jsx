import {
  SHARER_FOLLOW_FAIL,
  SHARER_FOLLOW_REQUEST,
  SHARER_FOLLOW_SUCCESS,
  SHARER_UNFOLLOW_FAIL,
  SHARER_UNFOLLOW_REQUEST,
  SHARER_UNFOLLOW_SUCCESS,
} from "../constants/followConstants";

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

export const unfollowReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHARER_UNFOLLOW_REQUEST:
      return { ...state, loading: true, error: null };
    case SHARER_UNFOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        // Assuming you have sharer data in your state, and isFollowed is a property indicating whether the sharer is followed
        sharer: {
          ...state.sharer,
          isFollowed: false,
        },
      };
    case SHARER_UNFOLLOW_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
