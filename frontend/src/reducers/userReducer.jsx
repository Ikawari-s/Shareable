import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_FETCH_SUCCESS,
  USER_SEND_PASSWORD_REQUEST,
  USER_SEND_PASSWORD_SUCCESS,
  USER_SEND_PASSWORD_FAIL,
  USER_NEW_PASSWORD_REQUEST,
  USER_NEW_PASSWORD_SUCCESS,
  USER_NEW_PASSWORD_FAIL,
  USER_LIKE_REQUEST,
  USER_LIKE_SUCCESS,
  USER_LIKE_FAIL,
  USER_UNLIKE_REQUEST,
  USER_UNLIKE_SUCCESS,
  USER_UNLIKE_FAIL,
  USER_COMMENT_REQUEST,
  USER_COMMENT_SUCCESS,
  USER_COMMENT_FAIL,
  USER_DELETE_COMMENT_REQUEST,
  USER_DELETE_COMMENT_SUCCESS,
  USER_DELETE_COMMENT_FAIL,
  USER_LIST_COMMENT_REQUEST,
  USER_LIST_COMMENT_SUCCESS,
  USER_LIST_COMMENT_FAIL
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_FETCH_SUCCESS:
      return { ...state, userInfo: action.payload };

    case USER_LOGOUT:
      return {}; // balik sa initial

    default:
      return state; // Pag wala ka pinakelaman
  }
};




export const userSendPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_NEW_PASSWORD_REQUEST:
      return { loading: true };

    case USER_SEND_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_SEND_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state; // Pag wala ka pinakelaman
  }
};



export const userNewPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SEND_PASSWORD_REQUEST:
      return { loading: true };

    case USER_NEW_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_NEW_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state; // Pag wala ka pinakelaman
  }
};


export const LikePostReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIKE_REQUEST:
      return { loading: true };

    case USER_LIKE_SUCCESS:
      return { loading: false, likedPostInfo: action.payload };

    case USER_LIKE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state; 
  }
};


export const UnlikePostReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UNLIKE_REQUEST:
      return { loading: true };

    case USER_UNLIKE_SUCCESS:
      return { loading: false, unlikedPostInfo: action.payload };

    case USER_UNLIKE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state; 
  }
};


export const CommentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_COMMENT_REQUEST:
      return { loading: true };

    case USER_COMMENT_SUCCESS:
      return { loading: false, commentedPostInfo: action.payload };

    case USER_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state; 
  }
};


export const DeleteCommentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_COMMENT_REQUEST:
      return { loading: true };

    case USER_DELETE_COMMENT_SUCCESS:
      return { loading: false, deletedCommentInfo: action.payload };

    case USER_DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state; 
  }
};



export const ListCommentPostReducer = (state = { loading: false, comments: [] }, action) => {
  switch (action.type) {
    case USER_LIST_COMMENT_REQUEST:
      return { ...state, loading: true };

    case USER_LIST_COMMENT_SUCCESS:
      return { loading: false, comments: action.payload };

    case USER_LIST_COMMENT_FAIL:
      return { loading: false, error: action.payload, comments: [] };

    default:
      return state; 
  }
};



