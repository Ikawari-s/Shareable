import { SHARER_FOLLOW_FAIL, SHARER_FOLLOW_REQUEST, SHARER_FOLLOW_SUCCESS, SHARER_UNFOLLOW_FAIL, SHARER_UNFOLLOW_REQUEST, SHARER_UNFOLLOW_SUCCESS, FOLLOWED_SHARER_LIST_FAIL, FOLLOWED_SHARER_LIST_REQUEST, FOLLOWED_SHARER_LIST_SUCCESS } from "../constants/followConstants";
import axios from 'axios';

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const followSharer = (sharerId) => async (dispatch) => {
  try {
    dispatch({ type: SHARER_FOLLOW_REQUEST });

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

    // Perform API call to follow the sharer
    // Use fetch or your preferred HTTP library for making the API call
    const response = await instance.post(`/api/follow-sharer/${sharerId}`, null, config);

    if (response.status === 200) { // Adjust the status code according to your API
      dispatch({
        type: SHARER_FOLLOW_SUCCESS,
        payload: { sharerId },
      });
    } else {
      const data = await response.data;
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

    // Perform API call to unfollow the sharer
    const response = await instance.post(`/api/unfollow-sharer/${sharerId}`, null, config);

    if (response.status === 200) { // Adjust the status code according to your API
      dispatch({
        type: SHARER_UNFOLLOW_SUCCESS,
        payload: { sharerId },
      });
    } else {
      const data = await response.data;
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



export const listFollowedSharers = () => async (dispatch) => {
  try {
    dispatch({ type: FOLLOWED_SHARER_LIST_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await instance.get('/api/followed-sharers/', config);

    if (response.status === 200) {
      dispatch({
        type: FOLLOWED_SHARER_LIST_SUCCESS,
        payload: response.data,
      });
    } else {
      const data = await response.data;
      dispatch({
        type: FOLLOWED_SHARER_LIST_FAIL,
        payload: data.detail || 'Failed to fetch followed sharers',
      });
    }
  } catch (error) {
    dispatch({
      type: FOLLOWED_SHARER_LIST_FAIL,
      payload: 'Failed to fetch followed sharers',
    });
  }
};


/* */