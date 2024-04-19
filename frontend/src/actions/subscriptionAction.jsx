import axios from "axios";
import {
  TIER1_LIST_REQUEST,
  TIER1_LIST_SUCCESS,
  TIER1_LIST_FAIL,
  TIER2_LIST_REQUEST,
  TIER2_LIST_SUCCESS,
  TIER2_LIST_FAIL,
  TIER3_LIST_REQUEST,
  TIER3_LIST_SUCCESS,
  TIER3_LIST_FAIL,
} from "../constants/subscriptionConstatns";

const instance = axios.create({
  baseURL: "https://abcabc123-acd97d6f01bb.herokuapp.com/",
});

export const listTier1FollowedSharers =
  (sharerId) => async (dispatch, getState) => {
    try {
      dispatch({ type: TIER1_LIST_REQUEST });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.access_token : null;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await instance.get(
        `/api/sharer/tier1-followed-sharers/${sharerId}/`,
        config
      );

      dispatch({
        type: TIER1_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TIER1_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listTier2FollowedSharers =
  (sharerId) => async (dispatch, getState) => {
    try {
      dispatch({ type: TIER2_LIST_REQUEST });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.access_token : null;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await instance.get(
        `/api/sharer/tier2-followed-sharers/${sharerId}/`,
        config
      );

      dispatch({
        type: TIER2_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TIER2_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listTier3FollowedSharers =
  (sharerId) => async (dispatch, getState) => {
    try {
      dispatch({ type: TIER3_LIST_REQUEST });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.access_token : null;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await instance.get(
        `/api/sharer/tier3-followed-sharers/${sharerId}/`,
        config
      );

      dispatch({
        type: TIER3_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TIER3_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
