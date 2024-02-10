import {
  SHARER_LIST_REQUEST,
  SHARER_LIST_SUCCESS,
  SHARER_LIST_FAIL,
  BE_SHARER_FAIL,
  BE_SHARER_REQUEST,
  BE_SHARER_SUCCESS,
} from "../constants/sharerConstants";

export const sharerListReducer = (state = { sharers: [] }, action) => {
  switch (action.type) {
    case SHARER_LIST_REQUEST:
      return { loading: true, sharers: [] };
    case SHARER_LIST_SUCCESS:
      return { loading: false, sharers: action.payload };
    case SHARER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case BE_SHARER_REQUEST:
      return { loading: true };

    case BE_SHARER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case BE_SHARER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state; // Pag wala ka pinakelaman
  }
};
