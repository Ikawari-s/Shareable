import {
  SHARER_LIST_REQUEST,
  SHARER_LIST_SUCCESS,
  SHARER_LIST_FAIL,
  BE_SHARER_FAIL,
  BE_SHARER_REQUEST,
  BE_SHARER_SUCCESS,
  SHARER_POST_REQUEST,
  SHARER_POST_SUCCESS,
  SHARER_POST_FAIL,
  SHARER_POST_LIST_REQUEST,
  SHARER_POST_LIST_SUCCESS,
  SHARER_POST_LIST_FAIL,
  SHARER_PROFILE_REQUEST,
  SHARER_PROFILE_SUCCESS,
  SHARER_PROFILE_FAIL,
  CHECK_SHARER_REQUEST,
  CHECK_SHARER_SUCCESS,
  CHECK_SHARER_FAIL,
  
} from "../constants/sharerConstants";

export const sharerListReducer = (state = { sharers: [] }, action) => {
  switch (action.type) {
    case SHARER_LIST_REQUEST:
      return { loading: true, sharers: [] };
    case SHARER_LIST_SUCCESS:
      return { loading: false, sharers: action.payload };
    case SHARER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSharerBeReducer = (state = {}, action) => {
  switch (action.type) {
    case BE_SHARER_REQUEST:
      return { loading: true };

    case BE_SHARER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case BE_SHARER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userSharerPostReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARER_POST_LIST_REQUEST:
      return { loading: true };

    case SHARER_POST_LIST_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case SHARER_POST_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const sharerPostListReducer = (
  state = { loading: false, posts: [], error: null },
  action
) => {
  switch (action.type) {
    case SHARER_POST_LIST_REQUEST:
      return { loading: true, posts: [], error: null };
    case SHARER_POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload, error: null };
    case SHARER_POST_LIST_FAIL:
      return { loading: false, posts: [], error: action.payload };
    default:
      return state;
  }
};

export const myProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARER_PROFILE_REQUEST:
      return { loading: true };

    case SHARER_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };

    case SHARER_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// PANG CHECK IF SHARER
export const CheckSharerReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_SHARER_REQUEST:
      return { loading: true };

    case CHECK_SHARER_SUCCESS:
      return { loading: false, isSharer: action.payload };

    case CHECK_SHARER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
