import {
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
} from "../constants/profileConstants";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://abcabc123-acd97d6f01bb.herokuapp.com/",
});

export const profile = () => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

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

    const response = await instance.get("api/user/profile/", config);

    dispatch({ type: USER_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_PROFILE_FAIL, payload: error.message });
  }
};
