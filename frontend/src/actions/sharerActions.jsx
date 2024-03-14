import axios from "axios";

import {
  SHARER_LIST_REQUEST,
  SHARER_LIST_SUCCESS,
  SHARER_LIST_FAIL,
  BE_SHARER_FAIL,
  BE_SHARER_REQUEST,
  BE_SHARER_SUCCESS,
  SHARER_POST_REQUEST,
  SHARER_POST_SUCCESS,
  SHARER_POST_FAIL,
  SHARER_POST_LIST_REQUEST,
  SHARER_POST_LIST_SUCCESS,
  SHARER_POST_LIST_FAIL,
  SHARER_PROFILE_REQUEST,
  SHARER_PROFILE_SUCCESS,
  SHARER_PROFILE_FAIL,
  CHECK_SHARER_REQUEST,
  CHECK_SHARER_SUCCESS,
  CHECK_SHARER_FAIL,
  SHARER_DETAIL_REQUEST,
  SHARER_DETAIL_SUCCESS,
  SHARER_DETAIL_FAIL,
  SHARER_LATEST_POST_REQUEST,
  SHARER_LATEST_POST_SUCCESS,
  SHARER_LATEST_POST_FAIL,
  SHARER_UPDATE_PROFILE_REQUEST,
  SHARER_UPDATE_PROFILE_SUCCESS,
  SHARER_UPDATE_PROFILE_FAILURE,
  SHARER_DELETE_POST_REQUEST,
  SHARER_DELETE_POST_SUCCESS,
  SHARER_DELETE_POST_FAILURE,
  REMOVE_DELETED_POST,
  FETCH_SHARER_RATINGS_REQUEST,
  FETCH_SHARER_RATINGS_SUCCESS,
  FETCH_SHARER_RATINGS_FAILURE,
  SHARER_RATINGS_REQUEST,
  POST_SHARER_RATINGS_SUCCESS,
  POST_SHARER_RATINGS_FAILURE,
} from "../constants/sharerConstants";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const DetailSharers = (id) => async (dispatch) => {
  try {
    dispatch({ type: SHARER_DETAIL_REQUEST });

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

    const { data } = await instance.get(`api/sharer/sharer-profile/${id}/`, config); 
    dispatch({ type: SHARER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHARER_DETAIL_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listSharers = () => async (dispatch) => {
  try {
    dispatch({ type: SHARER_LIST_REQUEST });

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

    const { data } = await instance.get("api/sharer/", config);
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

export const beSharer = (page_name) => async (dispatch) => {
  try {
    dispatch({ type: BE_SHARER_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await instance.post("api/be-sharer/", { page_name }, config);

    dispatch({
      type: BE_SHARER_SUCCESS,
      payload: response.data,
    });
    
    return response; // Return the response for further handling if needed
  } catch (error) {
    dispatch({
      type: BE_SHARER_FAIL,
      payload: error.response 
        ? error.response.data.detail || error.response.data.message
        : error.message,
    });
    throw error; // Rethrow the error for handling in the component
  }
};

export const uploadSharer = (formData) => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access_token : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    // Remove null values from formData
    const formDataUpload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formDataUpload.append(key, formData[key]);
      }
    });

    const { data } = await instance.post(
      "api/sharer/sharer-upload",
      formDataUpload,
      config
    );

    dispatch({ type: SHARER_POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHARER_POST_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


const BASE_URL = "http://localhost:8000";

export const listSharerPosts = () => async (dispatch) => {
  try {
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
    dispatch({ type: SHARER_POST_LIST_REQUEST });
    const { data } = await instance.get(
      "api/sharer/sharer-upload-list",
      config
    );

    // Map through data and format created_at
    const formattedData = data.map(post => ({
      ...post,
      created_at_formatted: new Date(post.created_at).toLocaleString() 
    }));

    // Format URLs based on file type
    const formattedPosts = formattedData.map(post => ({
      ...post,
      // Handle image URLs
      image_url: post.image ? `${BASE_URL}/${post.image}` : null,
      // Handle video URLs
      video_url: post.video ? `${BASE_URL}/${post.video}` : null,
      // Handle file URLs
      file_url: post.file ? `${BASE_URL}/${post.file}` : null
    }));

    dispatch({ type: SHARER_POST_LIST_SUCCESS, payload: formattedPosts });
  } catch (error) {
    dispatch({
      type: SHARER_POST_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};








export const profileSharers = () => async (dispatch) => {
  try {
    dispatch({ type: SHARER_PROFILE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.access_token : null;
    const userEmail = userInfo ? userInfo.email : null; // Get user email from userInfo

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    };

    const { data } = await instance.get('api/sharer/user-sharer-profile/', config);

    dispatch({
      type: SHARER_PROFILE_SUCCESS,
      payload: { ...data, userEmail }, // Include userEmail in the payload
    });
  } catch (error) {
    dispatch({
      type: SHARER_PROFILE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const FetchSharerLatestPost = (id) => async (dispatch) => { 
  try {
    console.log("Fetching latest post for sharer with id:", id);
    
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
      
    dispatch({ type: SHARER_LATEST_POST_REQUEST });
    
    const response = await instance.get(
      `api/sharer/sharer-lates-post/${id}/`, 
      config
    );
    
    console.log("Latest post response:", response.data);
    
    
    const postsWithCreatedAt = response.data.uploads.map(post => ({
      ...post,
      created_at: new Date(post.created_at).toLocaleString() 
    }));

    dispatch({ type: SHARER_LATEST_POST_SUCCESS, payload: postsWithCreatedAt });
  } catch (error) {
    console.error("Error fetching latest post:", error);
    
    dispatch({
      type: SHARER_LATEST_POST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


  
export const CheckerSharer = () => async (dispatch) => {
  try {
    dispatch({ type: CHECK_SHARER_REQUEST });

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

    const response = await instance.get("api/checker/", config);
    const { data } = response;

    // Assuming your data contains an 'isSharer' property
    dispatch({ type: CHECK_SHARER_SUCCESS, payload: { isSharer: data.isSharer } });
  } catch (error) {
    dispatch({
      type: CHECK_SHARER_FAIL,
      payload: error.message && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const SharerUpdateProfile = ({ name, image, username, description, category }) => {
  return async (dispatch) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo ? userInfo.access_token : null;

      const formData = new FormData();
      if (name) {
        formData.append('name', name);
      }
      if (image) {
        formData.append('image', image);
      }
      if (username) {
        formData.append('username', username);
      }
      if (description) {
        formData.append('description', description);
      }
      if (category) {
        formData.append('category', category); // Add the category to formData
      }

      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      dispatch({ type: SHARER_UPDATE_PROFILE_REQUEST });

      const response = await instance.patch('/api/sharer/update-profile-sharer/', formData, config);

      dispatch({ type: SHARER_UPDATE_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SHARER_UPDATE_PROFILE_FAILURE, payload: error.response.data });
    }
  };
};

export const sharerDeletePost = (uploadId) => async (dispatch) => {
  try {
    dispatch({ type: SHARER_DELETE_POST_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const accessToken = userInfo ? userInfo.access_token : null;
    console.log("Access token:", accessToken); 

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // Make API request to delete the post
    await axios.delete(`/api/sharer/sharer-post-delete/${uploadId}/`, config);

    dispatch({ type: SHARER_DELETE_POST_SUCCESS, payload: uploadId }); // Pass the uploadId as payload
    dispatch({ type: REMOVE_DELETED_POST, payload: uploadId }); // Add a new action to remove the post from the state
  } catch (error) {
    dispatch({
      type: SHARER_DELETE_POST_FAILURE,
      payload: error.response.data.message || 'Failed to delete post',
    });
  }
};


export const fetchSharerRatings = (sharerId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SHARER_RATINGS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const accessToken = userInfo ? userInfo.access_token : null;
    const username = userInfo ? userInfo.user_info.username : null; // Extract username

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(`/api/sharer/ratings/${sharerId}`, config);
    const ratings = response.data.map((rating) => ({ ...rating, user: username })); // Assign username to each rating

    console.log('Fetched Ratings:', ratings); // Log ratings data

    dispatch({ type: FETCH_SHARER_RATINGS_SUCCESS, payload: ratings });
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch sharer ratings';
    console.error('Error Fetching Ratings:', errorMessage); // Log error message
    dispatch({ type: FETCH_SHARER_RATINGS_FAILURE, payload: errorMessage });
  }
};


export const postSharerRatings = (sharerId, ratingData) => async (dispatch) => {
  try {
    dispatch({ type: SHARER_RATINGS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const accessToken = userInfo ? userInfo.access_token : null;

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    // Add all necessary fields to the ratingData object
    const fullRatingData = {
      ...ratingData,
      userId: userInfo.userId, // Assuming userId is stored in localStorage
      sharerId: sharerId,
      // Add any other necessary fields here
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // Make API request to post the ratings
    const response = await axios.post(`/api/sharer/ratings/${sharerId}`, fullRatingData, config);

    dispatch({ type: POST_SHARER_RATINGS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: POST_SHARER_RATINGS_FAILURE,
      payload: error.response.data.message || 'Failed to post ratings',
    });
  }
};
