import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/login/",
      { email: email, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    // Add the JWT token to request headers for subsequent requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

    localStorage.setItem("userInfo", JSON.stringify(response.data));

    return response;
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("http://127.0.0.1:8000/api/logout/");

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
