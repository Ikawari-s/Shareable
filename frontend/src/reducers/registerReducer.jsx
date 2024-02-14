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

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state; // Pag wala ka pinakelaman
  }
};

export const userSentOTPReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_OTP_SENT_REQUEST:
      return { loading: true };

    case USER_OTP_SENT_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_OTP_SENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userResendOTPReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_OTP_RESEND_REQUEST:
      return { loading: true };

    case USER_OTP_RESEND_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_OTP_RESEND_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};



export const userVerifyOTPReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_VERIFY_REQUEST:
        return { loading: true };
  
      case  USER_VERIFY_SUCCESS:
        return { loading: false, userInfo: action.payload };
  
      case  USER_VERIFY_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state; 
    }
  };
  