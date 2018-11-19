import { RECEIVE_LIST, GET_LIST } from '../actions/todo-actions';

const defaultStore = { list: [], current: null, isFetching: false };

const todoReducer = (store = defaultStore, action) => {
  switch (action.type) {
  case RECEIVE_LIST:
    return Object.assign({}, store, { list: action.payload, isFetching: false });
  case GET_LIST:
    return Object.assign({}, store, { isFetching: true });
  default:
    return store;
  }
};

export default todoReducer;