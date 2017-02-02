import {
   ENTRY_CREATE_SUCCESS,
   ENTRY_CREATE_ERROR,
   CLEAR_ENTRY_CREATION_STATUS,
   FETCH_ALL_ENTRIES_SUCCESS,
   FETCH_USER_ENTRIES_SUCCESS,
   FETCH_TWEETS_SUCCESS,
   TWEET_HIDDEN_SUCCESSFULY,
   TWEET_SHOWN_SUCCESSFULY
 } from './types';
import { makePostRequestWithToken, makeGetRequest, makeGetRequestWithToken } from './../ajax/requests';

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

export const getUserTweets = (userId,token) => {
  return (dispatch) => {
    const url = '/api/entries/user/tweets/' + userId;
    makeGetRequestWithToken(url,token).then((response) => {
      const parsedResponse = JSON.parse(response.data);
      dispatch({ type: FETCH_TWEETS_SUCCESS, payload: parsedResponse })
    }).catch((error) => {
          console.log(error);
    });
  }
}

export const hideUserTweet = (tweetid,token) => {
  return (dispatch) => {
    const url = "/api/entries/tweets/hide/" + tweetid;
    console.log(url);
    makePostRequestWithToken(url,null,token).then((response) => {
      const parsedResponse = JSON.parse(response.data);
      dispatch({ type: TWEET_HIDDEN_SUCCESSFULY, payload: parsedResponse });
      console.log(response);
    }).catch((error) => {
      console.log(error)
    });
  }
}


export const showUserHiddenTweet = (tweetid,token) => {
  return (dispatch) => {
    const url = "/api/entries/tweets/show/" + tweetid;
    console.log(url);
    makePostRequestWithToken(url,null,token).then((response) => {
      const parsedResponse = JSON.parse(response.data);
      dispatch({ type: TWEET_SHOWN_SUCCESSFULY, payload: parsedResponse });
    }).catch((error) => {
      console.log(error)
    });
  }
}
