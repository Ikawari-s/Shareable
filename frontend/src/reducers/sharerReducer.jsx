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
  SHARER_DETAIL_REQUEST,
  SHARER_DETAIL_SUCCESS,
  SHARER_DETAIL_FAIL,
  SHARER_LATEST_POST_REQUEST,
  SHARER_LATEST_POST_SUCCESS,
  SHARER_LATEST_POST_FAIL,
  SHARER_UPDATE_PROFILE_REQUEST,
  SHARER_UPDATE_PROFILE_SUCCESS,
  SHARER_UPDATE_PROFILE_FAILURE,
  SHARER_DELETE_POST_REQUEST,
  SHARER_DELETE_POST_SUCCESS,
  SHARER_DELETE_POST_FAILURE,
  REMOVE_DELETED_POST,
  FETCH_SHARER_RATINGS_REQUEST,
  FETCH_SHARER_RATINGS_SUCCESS,
  FETCH_SHARER_RATINGS_FAILURE,
} from "../constants/sharerConstants";

export const SharerDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARER_DETAIL_REQUEST:
      return { loading: true };

    case SHARER_DETAIL_SUCCESS:
      return { loading: false, sharer: action.payload };

    case SHARER_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

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
    case REMOVE_DELETED_POST:
      return {
          ...state,
          posts: state.posts.filter((post) => post.id !== action.payload),
        };
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

export const SharerLatestPostReducer = (state = { posts: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case SHARER_LATEST_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case SHARER_LATEST_POST_SUCCESS:
      return { ...state, loading: false, posts: action.payload, error: null };
    case SHARER_LATEST_POST_FAIL:
      return { ...state, loading: false, posts: [], error: action.payload };
    default:
      return state;
  }
};

// PANG CHECK IF SHARER DI NA GAMIT PERO WAG NIYO MUNA ALISIN
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


export const SharerUserProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case SHARER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, updateProfile: action.payload };

    case SHARER_UPDATE_PROFILE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


const sharerDeletePostReducer = (state = { loading: false, success: false, error: null }, action) => {
  switch (action.type) {
    case SHARER_DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case SHARER_DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };

    case SHARER_DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default sharerDeletePostReducer;




export const fetchSharerRatingsReducer = (state = { ratings: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case FETCH_SHARER_RATINGS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SHARER_RATINGS_SUCCESS:
      return { ...state, loading: false, ratings: action.payload, error: null };
    case FETCH_SHARER_RATINGS_FAILURE:
      return { ...state, loading: false, ratings: [], error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  ratings: [],
  loading: false,
  error: null,
};

export const sharerRatingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHARER_RATINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SHARER_RATINGS_SUCCESS:
      return {
        ...state,
        ratings: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SHARER_RATINGS_FAILURE:
      return {
        ...state,
        ratings: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
