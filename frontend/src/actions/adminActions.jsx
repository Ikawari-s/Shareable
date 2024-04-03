import axios from "axios";
import {
  GET_ADMIN_USER_REQUEST,
  GET_ADMIN_USER_SUCCESS,
  GET_ADMIN_USER_FAIL,
  CREATE_USER_ADMIN_REQUEST,
  CREATE_USER_ADMIN_SUCCESS,
  CREATE_USER_ADMIN_FAIL,
  UPDATE_USER_ADMIN_REQUEST,
  UPDATE_USER_ADMIN_SUCCESS,
  UPDATE_USER_ADMIN_FAIL,
  DELETE_USER_ADMIN_REQUEST,
  DELETE_USER_ADMIN_SUCCESS,
  DELETE_USER_ADMIN_FAIL,
  GET_SHARER_INCOME_ADMIN_REQUEST,
  GET_SHARER_INCOME_ADMIN_SUCCESS,
  GET_SHARER_INCOME_ADMIN_FAIL,
  INCOME_SENT_ADMIN_REQUEST,
  INCOME_SENT_ADMIN_SUCCESS,
  INCOME_SENT_ADMIN_FAIL,
  PATCH_SHARER_ADMIN_REQUEST,
  PATCH_SHARER_ADMIN_SUCCESS,
  PATCH_SHARER_ADMIN_FAIL
} from "../constants/adminConstants";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const listAdminUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_USER_REQUEST });

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

    const { data } = await instance.get("api/admin/user-dashboard/", config);
    dispatch({ type: GET_ADMIN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_USER_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createUserAdmin = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_ADMIN_REQUEST });

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

    // Include password in userData
    const dataToSend = { ...userData, password: userData.password1 };

    const response = await instance.post("api/admin/user-dashboard/", dataToSend, config);

    if (response.status === 201) {
      dispatch({ type: CREATE_USER_ADMIN_SUCCESS, payload: response.data });
      return response;
    } else {
      throw new Error("Bad Request");
    }
  } catch (error) {
    dispatch({
      type: CREATE_USER_ADMIN_FAIL,
      payload: error.message,
    });
    return null;
  }
};


export const updateUserAdmin = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_ADMIN_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const formData = new FormData();

    if (userData.username.trim() !== '') {
      formData.append('username', userData.username);
    }

    if (userData.is_active !== null) {
      formData.append('is_active', userData.is_active);
    }

    if (userData.is_sharer !== null) {
      formData.append('is_sharer', userData.is_sharer);
    }

    if (userData.is_staff !== null) {
      formData.append('is_staff', userData.is_staff);
    }

    if (userData.is_superuser !== null) {
      formData.append('is_superuser', userData.is_superuser);
    }

    if (userData.profile_picture !== null) {
      formData.append('profile_picture', userData.profile_picture);
    }

    const response = await instance.patch(`api/admin/user-dashboard/${userId}/`, formData, config);

    if (response.status === 200) {
      dispatch({ type: UPDATE_USER_ADMIN_SUCCESS, payload: response.data });
      return response;
    } else {
      throw new Error("Bad Request");
    }
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ADMIN_FAIL,
      payload: error.message,
    });
    return null;
  }
};



export const deleteUserAdmin = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_ADMIN_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.access_token : null;

    const config = token
      ? {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await instance.delete(`api/admin/user-dashboard/${userId}/`, config);

    if (response.status === 204) {
      dispatch({ type: DELETE_USER_ADMIN_SUCCESS });
    } else {
      throw new Error('Bad Request');
    }
  } catch (error) {
    dispatch({
      type: DELETE_USER_ADMIN_FAIL,
      payload: error.message,
    });
  }
};


export const getSharerIncomeAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SHARER_INCOME_ADMIN_REQUEST });

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

    const response = await instance.get("api/admin/sharer-dashboard/", config);

    dispatch({ type: GET_SHARER_INCOME_ADMIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_SHARER_INCOME_ADMIN_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendIncomeToSharer = (sharerId) => async (dispatch) => {
  try {
    dispatch({ type: INCOME_SENT_ADMIN_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.access_token : null;

    const config = token
      ? {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await instance.post(`api/admin/send-income/${sharerId}/`, {}, config);

    if (response.status === 200) {
      dispatch({ type: INCOME_SENT_ADMIN_SUCCESS });
    } else {
      throw new Error('Bad Request');
    }
  } catch (error) {
    dispatch({
      type: INCOME_SENT_ADMIN_FAIL,
      payload: error.message,
    });
  }
};



export const patchSharerAdmin = (sharerId, formData) => async (dispatch) => {
  try {
    dispatch({ type: PATCH_SHARER_ADMIN_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await instance.patch(`api/admin/patch-sharer/${sharerId}/`, formData, config);

    dispatch({ type: PATCH_SHARER_ADMIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PATCH_SHARER_ADMIN_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};