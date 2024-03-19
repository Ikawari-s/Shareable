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
  DELETE_SHARER_RATINGS_REQUEST,
  DELETE_SHARER_RATINGS_SUCCESS,
  DELETE_SHARER_RATINGS_FAILURE,
  PATCH_SHARER_RATINGS_REQUEST,
  PATCH_SHARER_RATINGS_SUCCESS,
  PATCH_SHARER_RATINGS_FAILURE,
  SHARER_EDIT_POST_REQUEST,
  SHARER_EDIT_POST_SUCCESS,
  SHARER_EDIT_POST_FAILURE,
  SHARER_POST_COUNT_REQUEST,
  SHARER_POST_COUNT_SUCCESS,
  SHARER_POST_COUNT_FAILURE,
  SHARER_PREVIEW_LIST_REQUEST,
  SHARER_PREVIEW_LIST_SUCCESS,
  SHARER_PREVIEW_LIST_FAILURE,
  SHARER_PREVIEW_REQUEST,
  SHARER_PREVIEW_SUCCESS,
  SHARER_PREVIEW_FAILURE
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



export const patchSharerRatingsReducer = (state = { updatedRating: null, loading: false, error: null }, action) => {
  switch (action.type) {
    case PATCH_SHARER_RATINGS_REQUEST:
      return { ...state, loading: true, error: null };
    case PATCH_SHARER_RATINGS_SUCCESS:
      return { ...state, loading: false, updatedRating: action.payload, error: null };
    case PATCH_SHARER_RATINGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sharerEditPostReducer = (state = {
  loading: false,
  success: false,
  error: null
}, action) => {
  switch (action.type) {
    case SHARER_EDIT_POST_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };
    case SHARER_EDIT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null
      };
    case SHARER_EDIT_POST_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
};



export const sharerPostCountReducer = (state = { postCount: null, loading: false, error: null }, action) => {
  switch (action.type) {
    case SHARER_POST_COUNT_REQUEST:
      return { ...state, loading: true, error: null };
    case SHARER_POST_COUNT_SUCCESS:
      return { ...state, loading: false, postCount: action.payload };
    case SHARER_POST_COUNT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


// Reducer for fetching list of sharer previews
export const sharerPreviewListReducer = (state = { previews: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case SHARER_PREVIEW_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case SHARER_PREVIEW_LIST_SUCCESS:
      return { ...state, loading: false, previews: action.payload }; // Update previews with action payload
    case SHARER_PREVIEW_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


// Reducer for fetching individual sharer preview
export const sharerPreviewReducer = (state = { preview: null, loading: false, error: null }, action) => {
  switch (action.type) {
    case SHARER_PREVIEW_REQUEST:
      return { ...state, loading: true, error: null };
    case SHARER_PREVIEW_SUCCESS:
      return { ...state, loading: false, preview: action.payload };
    case SHARER_PREVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};