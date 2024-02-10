import { USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS } from "../constants/profileConstants";
import axios from 'axios';

export const profile = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    // Set the authorization header using Axios defaults
    const accessToken = localStorage.getItem('accessToken'); // Assuming you store the access token in localStorage
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/user/profile/',
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
