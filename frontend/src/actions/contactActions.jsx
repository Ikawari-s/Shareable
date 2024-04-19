import axios from "axios";
import {
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_FAIL,
} from "../constants/contactConstants";

const instance = axios.create({
  baseURL: "https://abcabc123-acd97d6f01bb.herokuapp.com/",
});

export const submitContactRequest = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_REQUEST });

    const response = await instance.post("/api/contacts/", formData);

    if (!formData.get("attachment")) {
      dispatch({ type: CONTACT_SUCCESS });
    } else {
      if (response.status === 200) {
        dispatch({ type: CONTACT_SUCCESS });
      } else {
        dispatch({ type: CONTACT_FAIL });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    dispatch({ type: CONTACT_FAIL });
  }
};
