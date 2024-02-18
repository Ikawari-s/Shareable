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
  baseURL: 'http://127.0.0.1:8000/',
});


export const register = (email, password, username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await instance.post(
      "api/register/",
      { email, username, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // localStorage.setItem('userInfo', JSON.stringify(data)); ina neto meron pala nag seset agad kaya pala na lologin
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};



export const verifyOTP = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await instance.post(
      'api/verify-otp/',
      { email, otp },
      config
    );

    dispatch({
      type: USER_VERIFY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_VERIFY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};



export const resendOTP = (email) => async (dispatch) => {
  try {
    dispatch({ type:  USER_OTP_RESEND_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await instance.post(
      'api/resend-otp/',
      { email },
      config
    );

    dispatch({
      type: USER_OTP_RESEND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_OTP_RESEND_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};