import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
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
  USER_LIST_COMMENT_FAIL,
  FETCH_LIKES_COUNT_REQUEST,
  FETCH_LIKES_COUNT_SUCCESS,
  FETCH_LIKES_COUNT_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  REMOVE_DELETED_POST,
  
} from "../constants/userConstants";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await instance.post("api/login/", { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;
    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
    await instance.post("api/logout/");
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    console.log("Logout successful");
  } catch (error) {
    console.error("Error during logout:", error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Logout failed. Please try again.",
    });
  }
};

export const sendPasswordRequest = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_SEND_PASSWORD_REQUEST });
    const response = await instance.post("api/request-reset-email/", {
      email: email,
      redirect_url: "http://localhost:3000/new-password/",
    });
    dispatch({
      type: USER_SEND_PASSWORD_SUCCESS,
      payload: response.data.success,
    });
  } catch (error) {
    dispatch({
      type: USER_SEND_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const userNewPasswordReducer =
  (uidb64, token, password, password2) => async (dispatch) => {
    try {
      dispatch({ type: USER_NEW_PASSWORD_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await instance.patch(
        "api/password-reset-complete/",
        { uidb64, token, password, password2 },
        config
      );
      dispatch({ type: USER_NEW_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_NEW_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      throw error;
    }
  };

export const likePost = (uploadId, token) => async (dispatch) => {
  dispatch({ type: USER_LIKE_REQUEST });
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;
    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
    await instance.post(`api/sharer/posts/like/${uploadId}/`, null, config);
    dispatch({ type: USER_LIKE_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_LIKE_FAIL, payload: error.message });
  }
};

export const unlikePost = (uploadId, token) => async (dispatch) => {
  dispatch({ type: USER_UNLIKE_REQUEST });
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;
    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
    await instance.post(`api/sharer/posts/unlike/${uploadId}/`, null, config);
    dispatch({ type: USER_UNLIKE_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_UNLIKE_FAIL, payload: error.message });
  }
};

export const fetchLikesCount = (uploadId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LIKES_COUNT_REQUEST, payload: { uploadId } });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;

    const config = token
      ? {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      : {};

    try {
      const response = await instance.get(`api/sharer/posts/count-likes/${uploadId}/`, config);

      dispatch({
        type: FETCH_LIKES_COUNT_SUCCESS,
        payload: {
          likesCount: response.data.likes_count,
          unlikesCount: response.data.unlikes_count,
          uploadId: uploadId 
        }
      });
    } catch (error) {
      dispatch({
        type: FETCH_LIKES_COUNT_FAILURE,
        payload: { error: error.message, uploadId }
      });
    }
  };
};


export const postComment = (uploadId, comments, accessToken, username) => async (dispatch) => {
  try {
    dispatch({ type: USER_COMMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const requestData = {
      username: username,
      comments: comments,
    };
    const response = await instance.post(
      `api/sharer/posts/comment/${uploadId}/`,
      requestData,
      config
    );
    dispatch({ type: USER_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_COMMENT_FAIL, payload: error.message });
  }
};

export const listComments = (uploadId) => async (dispatch) => {
  dispatch({ type: USER_LIST_COMMENT_REQUEST });
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const response = await instance.get(`api/sharer/comments/${uploadId}/`, config);
    const { data } = response;
    dispatch({ type: USER_LIST_COMMENT_SUCCESS, payload: { comments: data, uploadId } });
  } catch (error) {
    dispatch({ type: USER_LIST_COMMENT_FAIL, payload: error.response ? error.response.data.message : error.message });
  }
};



export const deleteComments = (commentId) => async (dispatch) => {
  dispatch({ type: USER_DELETE_COMMENT_REQUEST });
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const response = await instance.delete(`api/sharer/comment/delete/${commentId}/`, config);
    const { data } = response;
    dispatch({ type: USER_DELETE_COMMENT_SUCCESS, payload: { comments: data, commentId } });
  } catch (error) {
    dispatch({ type: USER_DELETE_COMMENT_FAIL, payload: error.response ? error.response.data.message : error.message });
  }
};



export const updateUserProfile = ({ profile_picture, username }) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;

    const formData = new FormData();
    
    // Append profile_picture only if it's present
    if (profile_picture) {
      formData.append('profile_picture', profile_picture);
    }
    
    // Append username only if it's present
    if (username) {
      formData.append('username', username);
    }

    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
        // Set the correct content type for FormData
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await instance.patch('api/profile/update/', formData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const fetchUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_PROFILE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      : {};

    const response = await instance.get('api/user-profile/', config);

    dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_PROFILE_FAILURE, payload: error.message });
  }
};


export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: USER_CHANGE_PASSWORD_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const accessToken = userInfo ? userInfo.access_token : null;

    console.log("Access token:", accessToken); 

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await instance.patch(
      "/api/change-password/",
      { old_password: oldPassword, new_password: newPassword },
      config
    );

    dispatch({ type: USER_CHANGE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_CHANGE_PASSWORD_FAIL, payload: error.message });
    throw error;
  }
};
