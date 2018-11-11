export const FETCH_USERS = 'FETCH_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const SET_USER = 'SET_USER';
export const GET_USER = 'GET_USER';
export const GIT_LOADING = 'GIT_LOADING';
export const GIT_LOADED = 'STOP_FETCHING';

export const fetchUser = username => (
  { type: FETCH_USERS, payload: username }
);

export const receiveUser = userList => (
  { type: RECEIVE_USERS, payload: userList }
);

export const receiveError = error => {
  return { type: RECEIVE_ERROR, payload: error }
};

export const getUser = userId => (
  { type: GET_USER, payload: parseInt(userId) }
);

export const setUser = user => (
  { type: SET_USER, payload: user }
);

export const isFetching = () => {
  return { type: GIT_LOADING }
};

export const stopFetching = () => {
  return { type: GIT_LOADED }
};
