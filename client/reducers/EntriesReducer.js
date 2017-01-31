import {
  ENTRY_CREATE_SUCCESS,
  ENTRY_CREATE_ERROR,
  CLEAR_ENTRY_CREATION_STATUS,
  FETCH_ALL_ENTRIES_SUCCESS,
  FETCH_USER_ENTRIES_SUCCESS
} from './../actions/types';

const INITIAL_STATE = {
  entrycreatesuccess: false,
  entrycreateerror: false,
  entrieslist : null,
  userentries: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ENTRY_CREATE_SUCCESS:
      return { ...state, entrycreatesuccess: true};
    case ENTRY_CREATE_ERROR:
      return { ...state, entrycreateerror: true };
    case CLEAR_ENTRY_CREATION_STATUS:
      return { ...state, entrycreatesuccess: false, entrycreateerror: false};
    case FETCH_ALL_ENTRIES_SUCCESS:
      return {...state, entrieslist: action.payload }
    case FETCH_USER_ENTRIES_SUCCESS:
      return { ...state, userentries: action.payload};
    default:
     return state;
  }
}
