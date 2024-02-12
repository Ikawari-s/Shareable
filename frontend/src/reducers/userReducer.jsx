import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_FETCH_SUCCESS,
  USER_SEND_PASSWORD_REQUEST,
  USER_SEND_PASSWORD_SUCCESS,
  USER_SEND_PASSWORD_FAIL,
  USER_NEW_PASSWORD_REQUEST,
  USER_NEW_PASSWORD_SUCCESS,
  USER_NEW_PASSWORD_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_FETCH_SUCCESS:
      return { ...state, userInfo: action.payload };

    case USER_LOGOUT:
      return {}; // balik sa initial

    default:
      return state; // Pag wala ka pinakelaman
  }
};




export const userSendPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_NEW_PASSWORD_REQUEST:
      return { loading: true };

    case USER_SEND_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_SEND_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state; // Pag wala ka pinakelaman
  }
};



export const userNewPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SEND_PASSWORD_REQUEST:
      return { loading: true };

    case USER_NEW_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_NEW_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state; // Pag wala ka pinakelaman
  }
};

