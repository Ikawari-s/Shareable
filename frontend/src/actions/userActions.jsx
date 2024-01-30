import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants"
import axios from 'axios'
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
        const config ={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post(
            'http://127.0.0.1:8000/api/login/',
            {'email': email, 'password':password},
            config
            )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data)) //eto store pag logged in

        
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }

}


export const logout = () => async (dispatch) => {
    try {
      // Make an Axios request to your logout API endpoint
      await axios.post('http://127.0.0.1:8000/api/logout/');
  
      // Clear user information from local storage
      localStorage.removeItem('userInfo');
  
      // Dispatch the USER_LOGOUT action
      dispatch({ type: USER_LOGOUT });
  
      console.log('Logout successful');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };