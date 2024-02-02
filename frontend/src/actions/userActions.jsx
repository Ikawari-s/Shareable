import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";


const getCSRFTokenFromCookie = () => {
  const csrfCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));

  if (csrfCookie) {
    return csrfCookie.split("=")[1];
  }

  return null; 
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFTokenFromCookie(),
        withCredentials: true, 
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
