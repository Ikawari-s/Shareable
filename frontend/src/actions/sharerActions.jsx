import axios from "axios";

import {
  SHARER_LIST_REQUEST,
  SHARER_LIST_SUCCESS,
  SHARER_LIST_FAIL,
  BE_SHARER_FAIL,
  BE_SHARER_REQUEST,
  BE_SHARER_SUCCESS,
} from "../constants/sharerConstants";

export const listSharers = () => async (dispatch) => {
  try {
    dispatch({ type: SHARER_LIST_REQUEST });
    const { data } = await axios.get("http://127.0.0.1:8000/api/sharer/");
    dispatch({ type: SHARER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHARER_LIST_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const be_sharer = (title) => async (dispatch) => {
  try {
    dispatch({ type: BE_SHARER_REQUEST });

    // Make the API request to update user's sharer status
    const response = await axios.post(
      "http://127.0.0.1:8000/api/user/be-sharer",
      { title }
    );

    dispatch({
      type: BE_SHARER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: BE_SHARER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
