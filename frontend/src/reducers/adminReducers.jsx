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

const initialState = {
  loading: false,
  usersData: [],
  error: null,
};

export const adminUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ADMIN_USER_SUCCESS:
      return { ...state, loading: false, usersData: action.payload };
    case GET_ADMIN_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export const createUserAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_ADMIN_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_USER_ADMIN_SUCCESS:
      return { ...state, loading: false, userData: action.payload };
    case CREATE_USER_ADMIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export const updateUserAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_ADMIN_REQUEST:
      return { ...state, loading: true, error: null, successMessage: null };
    case UPDATE_USER_ADMIN_SUCCESS:
      return { ...state, loading: false, successMessage: 'User updated successfully' };
    case UPDATE_USER_ADMIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteUserAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_ADMIN_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_USER_ADMIN_SUCCESS:
      return { ...state, loading: false, successMessage: 'User deleted successfully' };
    case DELETE_USER_ADMIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export const sharerIncomeAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHARER_INCOME_ADMIN_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_SHARER_INCOME_ADMIN_SUCCESS:
      console.log("Payload:", action.payload); // Log the payload
      return { ...state, loading: false, sharerData: action.payload, error: null };
    case GET_SHARER_INCOME_ADMIN_FAIL:
      return { ...state, loading: false, sharerData: [], error: action.payload };
    default:
      return state;
  }
};


export const sentSharerIncomeAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCOME_SENT_ADMIN_REQUEST:
      return { ...state, loading: true, error: null };
    case INCOME_SENT_ADMIN_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    case INCOME_SENT_ADMIN_FAIL:
      return { ...state, loading: false, message: null, error: action.payload };
    default:
      return state;
  }
};

export const patchSharerAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH_SHARER_ADMIN_REQUEST:
      return { ...state, loading: true, error: null };
    case PATCH_SHARER_ADMIN_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    case PATCH_SHARER_ADMIN_FAIL:
      return { ...state, loading: false, message: null, error: action.payload };
    default:
      return state;
  }
};