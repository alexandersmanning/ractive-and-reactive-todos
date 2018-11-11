import {GIT_LOADING, GIT_LOADED, RECEIVE_ERROR, RECEIVE_USERS, SET_USER} from "../actions/github-user-actions";

const githubUserReducer = (store = { users: [], errors: {}, currentUser: null, isFetching: false }, action) => {
  switch(action.type) {
  case GIT_LOADING:
    return Object.assign({}, store, { isFetching: true });
  case GIT_LOADED:
    return Object.assign({}, store, { isFetching: false });
  case RECEIVE_USERS:
    return Object.assign({}, store, { users: action.payload });
  case RECEIVE_ERROR:
    return Object.assign({}, store, { errors: action.payload });
  case SET_USER:
    return Object.assign({}, store, { currentUser: action.payload });
  default:
    return store;
  }
};

export default githubUserReducer;