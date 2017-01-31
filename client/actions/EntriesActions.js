import {
   ENTRY_CREATE_SUCCESS,
   ENTRY_CREATE_ERROR,
   CLEAR_ENTRY_CREATION_STATUS,
   FETCH_ALL_ENTRIES_SUCCESS,
   FETCH_USER_ENTRIES_SUCCESS
 } from './types';
import { makePostRequestWithToken, makeGetRequest } from './../ajax/requests';

export const createEntry = (data,token) => {
  return (dispatch) => {
    makePostRequestWithToken("/api/entries/add",data,token).then((response) => {
       dispatch({ type: ENTRY_CREATE_SUCCESS });
    }).catch((error) => {
      dispatch({ type: ENTRY_CREATE_ERROR });
    });
  }
}

export const clearEntryCreationStatus = () => {
  return {
    type: CLEAR_ENTRY_CREATION_STATUS
  }
}

export const getAllEntries = () => {
  return (dispatch) => {
    makeGetRequest("/api/entries").then((response) => {
      const parsedResponse = JSON.parse(response.data);
      dispatch({ type: FETCH_ALL_ENTRIES_SUCCESS , payload: parsedResponse });
    }).catch((error) => {
      console.log(error);
    });
  }
}

export const getUserEntries = (userId) => {
  return (dispatch) => {
    const url = "/api/entries/user/" + userId;
    makeGetRequest(url).then((response) => {
      const parsedResponse = JSON.parse(response.data);
      dispatch({ type: FETCH_USER_ENTRIES_SUCCESS, payload: parsedResponse });
    }).catch((error) => {
      console.log(error);
    });
  }
}
