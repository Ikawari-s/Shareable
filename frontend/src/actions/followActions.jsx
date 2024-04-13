import {
  SHARER_FOLLOW_FAIL,
  SHARER_FOLLOW_REQUEST,
  SHARER_FOLLOW_SUCCESS,
  SHARER_UNFOLLOW_FAIL,
  SHARER_UNFOLLOW_REQUEST,
  SHARER_UNFOLLOW_SUCCESS,
  FOLLOWED_SHARER_LIST_FAIL,
  FOLLOWED_SHARER_LIST_REQUEST,
  FOLLOWED_SHARER_LIST_SUCCESS,
  GET_EXPIRATION_REQUEST,
  GET_EXPIRATION_SUCCESS,
  GET_EXPIRATION_FAIL,
} from "../constants/followConstants";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const followSharer = (sharerId, tier, amount) => async (dispatch) => {
  try {
    dispatch({ type: SHARER_FOLLOW_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;
    if (!token) {
      throw new Error("Authorization token not found");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const requestData = {
      tier,
      amount: parseFloat(amount),
    };

    const response = await axios.post(
      `/api/follow-sharer/${sharerId}`,
      requestData,
      config
    );

    dispatch({
      type: SHARER_FOLLOW_SUCCESS,
      payload: response.data, // Adjust payload as needed based on API response
    });

    return response; // Return response if needed
  } catch (error) {
    dispatch({
      type: SHARER_FOLLOW_FAIL,
      payload: error.response
        ? error.response.data.detail || error.response.data.message
        : error.message,
    });

    throw error;
  }
};

export const unfollowSharer = (sharerId, tier) => async (dispatch) => {
  try {
    dispatch({ type: SHARER_UNFOLLOW_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Perform API call to unfollow the sharer using DELETE method
    const response = await axios.delete(`/api/unfollow-sharer/${sharerId}/`, {
      ...config,
      data: { tier },
    }); // Pass tier in the request body

    if (response.status === 200) {
      // Adjust the status code according to your API
      dispatch({
        type: SHARER_UNFOLLOW_SUCCESS,
        payload: { sharerId },
      });
    } else {
      const data = await response.data;
      dispatch({
        type: SHARER_UNFOLLOW_FAIL,
        payload: data.detail || "Failed to unfollow sharer",
      });
    }
  } catch (error) {
    dispatch({
      type: SHARER_UNFOLLOW_FAIL,
      payload: "Failed to unfollow sharer",
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

    const response = await instance.get("/api/followed-sharers/", config);

    if (response.status === 200) {
      dispatch({
        type: FOLLOWED_SHARER_LIST_SUCCESS,
        payload: response.data,
      });
    } else {
      const data = await response.data;
      dispatch({
        type: FOLLOWED_SHARER_LIST_FAIL,
        payload: data.detail || "Failed to fetch followed sharers",
      });
    }
  } catch (error) {
    dispatch({
      type: FOLLOWED_SHARER_LIST_FAIL,
      payload: "Failed to fetch followed sharers",
    });
  }
};

export const getExpiration = () => async (dispatch) => {
  try {
    dispatch({ type: GET_EXPIRATION_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get("/api/follow-checker/", config);

    if (response.status === 200) {
      const expirationData = response.data;
      console.log("Expiration Data:", expirationData); 
      dispatch({
        type: GET_EXPIRATION_SUCCESS,
        payload: expirationData,
      });

      const updatedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      updatedUserInfo.expiration_dates = expirationData;
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    } else {
      console.error("Failed to get expiration data. Response status:", response.status);
      const data = await response.data;
      dispatch({
        type: GET_EXPIRATION_FAIL,
        payload: data.detail || "Failed to get expiration data",
      });
    }
  } catch (error) {
    console.error("Error fetching expiration data:", error);
    dispatch({
      type: GET_EXPIRATION_FAIL,
      payload: "Failed to get expiration data",
    });
  }
};


/* */
