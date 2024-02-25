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
} from "../constants/userConstants";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await instance.post(
      "api/login/",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

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
      dispatch({
        type: USER_NEW_PASSWORD_REQUEST,
      });

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

      dispatch({
        type: USER_NEW_PASSWORD_SUCCESS,
        payload: data,
      });
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

export const postComment = (uploadId, content, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_COMMENT_REQUEST });

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

    const requestData = {
      content: content,
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
  try {
    dispatch({ type: USER_LIST_COMMENT_REQUEST });

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

    const response = await instance.get(`api/sharer/comments/${uploadId}/`, config);
    const { data } = response;

    dispatch({ type: USER_LIST_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_COMMENT_FAIL, payload: error.message });
  }
};