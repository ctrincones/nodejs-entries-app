import { makePostRequest } from './../ajax/requests';
import { saveUserData } from './../localStorage';
import { makeGetRequestWithToken,
   makeDeleteRequestWithToken,
   makePostRequestWithToken
  } from './../ajax/requests';
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  CLEAR_NOTIFICATIONS,
  USER_DATA_REQUEST,
  SIGNOUT_USER,
  CLEAR_AUTH_STATE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  ENTRY_CREATE_ERROR,
  EMTRY_CREATE_SUCCESS
} from './types';

export const registrationRequest = (newUser) => {
  return (dispatch) => {
  makePostRequest("/api/users/register", newUser).then((response)=>{
       const userData = {
         token: response.token
       };
       saveUserData(userData);
       const parsedResponse = JSON.parse(response.data);
       dispatch({ type: REGISTRATION_SUCCESS, payload: parsedResponse });
   }).catch((error)=> {
        dispatch({ type: REGISTRATION_ERROR, payload: error });
   });
  }
}

export const getUserData = (token) => {
  return (dispatch) => {
    makeGetRequestWithToken("/api/user/get", token).then((response) => {
      const parsedData = JSON.parse(response.data);
      dispatch({ type: USER_DATA_REQUEST, payload: parsedData });
    }).catch((error) => {
      console.log(error);
    });
  }
}

export const clearNotifications = () => {
  return {
    type: CLEAR_NOTIFICATIONS
  };
}

export const signOutUser = (token) => {
    return (dispatch) => {
      localStorage.clear();
      makeDeleteRequestWithToken("/api/users/delete/token",token).then(() => {
           dispatch({ type: SIGNOUT_USER });
      }).catch((error) => {
          console.log(error);
      });
    }
}

export const clearAuthState = () => {
  return {
    type: CLEAR_AUTH_STATE
  }
}

export const loginUser = (data) => {
  return (dispatch) => {
    makePostRequest("/api/users/login", data).then((response) => {
       const jsonParsed = JSON.parse(response.data);
       const userData = {
         token: response.token
       };
       saveUserData(userData);
       dispatch({ type: LOGIN_USER_SUCCESS, payload: jsonParsed});
    }).catch((error) => {
      console.log(error);
      dispatch({ type: LOGIN_USER_ERROR });
    });
  };
}
