

import {
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_FAIL,
} from '../constants/contactConstants';

export const submitContactRequest = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_REQUEST });

    const response = await fetch('http://127.0.0.1:8000/api/contacts/', {
      method: 'POST',
      body: formData,
    });

    if (!formData.get('attachment')) {
      dispatch({ type: CONTACT_SUCCESS });
    } else {
      if (response.ok) {
        dispatch({ type: CONTACT_SUCCESS });
      } else {
        dispatch({ type: CONTACT_FAIL });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    dispatch({ type: CONTACT_FAIL });
  }
};

