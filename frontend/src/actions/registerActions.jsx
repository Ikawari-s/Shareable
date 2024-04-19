import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_OTP_SENT_REQUEST,
  USER_OTP_SENT_SUCCESS,
  USER_OTP_SENT_FAIL,
  USER_OTP_RESEND_REQUEST,
  USER_OTP_RESEND_SUCCESS,
  USER_OTP_RESEND_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
} from "../constants/registerConstants";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://abcabc123-acd97d6f01bb.herokuapp.com/",
});

export const register = (email, password, username) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/register/",
      { email, password, username },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    throw error;
  }
};

export const verifyOTP = (userId, otp, otpId) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/verify-otp/",
      { user_id: userId, otp, otp_id: otpId },
      config
    );

    dispatch({
      type: USER_VERIFY_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;

    dispatch({
      type: USER_VERIFY_FAIL,
      payload: errorMessage,
    });

    throw errorMessage; // Throw error message instead of error object
  }
};

export const resendOTP = (userId, otpId) => async (dispatch) => {
  try {
    dispatch({ type: USER_OTP_RESEND_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/resend-otp/",
      { user_id: userId, otp_id: otpId },
      config
    );

    dispatch({
      type: USER_OTP_RESEND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;

    dispatch({
      type: USER_OTP_RESEND_FAIL,
      payload: errorMessage,
    });

    throw errorMessage; // Throw error message instead of error object
  }
};
