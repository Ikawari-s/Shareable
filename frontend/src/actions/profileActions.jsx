import { USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS } from "../constants/profileConstants";
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});


export const profile = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

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
    const { data } = await instance.get(
      'api/user/profile/',
      config
    );

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};
