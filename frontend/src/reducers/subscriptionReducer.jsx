import {
  TIER1_LIST_REQUEST,
  TIER1_LIST_SUCCESS,
  TIER1_LIST_FAIL,
  TIER2_LIST_REQUEST,
  TIER2_LIST_SUCCESS,
  TIER2_LIST_FAIL,
  TIER3_LIST_REQUEST,
  TIER3_LIST_SUCCESS,
  TIER3_LIST_FAIL,
} from "../constants/subscriptionConstatns";


export const tier1FollowedSharersReducer = (state = { posts: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case TIER1_LIST_REQUEST: // Assuming TIER1_LIST_REQUEST is the correct constant
      return { ...state, loading: true, error: null };
    case TIER1_LIST_SUCCESS: // Assuming TIER1_LIST_SUCCESS is the correct constant
      return { ...state, loading: false, posts: action.payload, error: null };
    case TIER1_LIST_FAIL: // Assuming TIER1_LIST_FAIL is the correct constant
      return { ...state, loading: false, posts: [], error: action.payload };
    default:
      return state;
  }
};



export const tier2FollowedSharersReducer = (
  state = { posts: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case TIER2_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case TIER2_LIST_SUCCESS:
      return { ...state, loading: false, posts: action.payload, error: null };
    case TIER2_LIST_FAIL:
      return { ...state, loading: false, posts: [], error: action.payload };
    default:
      return state;
  }
};


export const tier3FollowedSharersReducer = (
  state = { posts: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case TIER3_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case TIER3_LIST_SUCCESS:
      return { ...state, loading: false, posts: action.payload, error: null };
    case TIER3_LIST_FAIL:
      return { ...state, loading: false, posts: [], error: action.payload };
    default:
      return state;
  }
};
