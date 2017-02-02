import {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  CLEAR_NOTIFICATIONS,
  USER_DATA_REQUEST,
  SIGNOUT_USER,
  CLEAR_AUTH_STATE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  ENTRY_CREATE_SUCCESS,
  TWEET_HIDDEN_SUCCESSFULY,
  TWEET_SHOWN_SUCCESSFULY
} from './../actions/types';

const INITIAL_STATE = {
  user: null,
  registrationsuccess: false,
  registrationerror: false,
  loginsuccess: false,
  loginerror: false
};

export default ( state = INITIAL_STATE, action) => {
  switch(action.type){
    case REGISTRATION_SUCCESS:
      return {...state, registrationsuccess: true, user: action.payload};
      return state;
    case REGISTRATION_ERROR:
      return { ...state, registrationerror: true};
    case CLEAR_NOTIFICATIONS:
      return { ...state, registrationerror: false, registrationsuccess: false, loginsuccess: false, loginerror: false};
    case USER_DATA_REQUEST:
      return { ...state, user: action.payload };
    case SIGNOUT_USER:
      return INITIAL_STATE;
    case CLEAR_AUTH_STATE:
      return INITIAL_STATE;
    case LOGIN_USER_SUCCESS:
      return { ...state, loginsuccess: true, user: action.payload };
    case LOGIN_USER_ERROR:
      return {...state, loginerror: true};
     case TWEET_HIDDEN_SUCCESSFULY:
      return {...state, user: action.payload};
     case TWEET_SHOWN_SUCCESSFULY:
      return {...state,user: action.payload};
    default:
      return state;
  }
}
