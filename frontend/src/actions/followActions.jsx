import {
  SHARER_FOLLOW_FAIL,
  SHARER_FOLLOW_REQUEST,
  SHARER_FOLLOW_SUCCESS,
  SHARER_UNFOLLOW_FAIL,
  SHARER_UNFOLLOW_REQUEST,
  SHARER_UNFOLLOW_SUCCESS,
} from "../constants/followConstants";
import axios from 'axios';

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const followSharer = (sharerId) => async (dispatch) => {
  try {
    dispatch({ type: SHARER_FOLLOW_REQUEST });

    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).access_token : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    // Perform API call to follow the sharer
    const response = await instance.post(`/api/follow-sharer/${sharerId}`, null, config);

    if (response.status === 200) {
      dispatch({
        type: SHARER_FOLLOW_SUCCESS,
        payload: { sharerId },
      });
    } else {
      const data = response.data;
      dispatch({
        type: SHARER_FOLLOW_FAIL,
        payload: data.detail || 'Failed to follow sharer',
      });
    }
  } catch (error) {
    dispatch({
      type: SHARER_FOLLOW_FAIL,
      payload: 'Failed to follow sharer',
    });
  }
};

export const unfollowSharer = (sharerId) => async (dispatch) => {
  try {
    dispatch({ type: SHARER_UNFOLLOW_REQUEST });

    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).access_token : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};


    const response = await instance.delete(`/api/unfollow-sharer/${sharerId}/`, config);

    if (response.status === 200) {
      dispatch({
        type: SHARER_UNFOLLOW_SUCCESS,
        payload: { sharerId },
      });
    } else {
      const data = response.data;
      dispatch({
        type: SHARER_UNFOLLOW_FAIL,
        payload: data.detail || 'Failed to unfollow sharer',
      });
    }
  } catch (error) {
    dispatch({
      type: SHARER_UNFOLLOW_FAIL,
      payload: 'Failed to unfollow sharer',
    });
  }
};
