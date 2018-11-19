import { RECEIVE_LIST, GET_LIST, ITEM_UPDATED, UPDATE_ITEM } from '../actions/todo-actions';

const defaultStore = { list: [], current: null, isFetching: false };

const todoReducer = (store = defaultStore, action) => {
  switch (action.type) {
  case RECEIVE_LIST:
    return Object.assign({}, store, { list: action.payload, isFetching: false });
  case GET_LIST:
    return Object.assign({}, store, { isFetching: true });
  case UPDATE_ITEM:
    return Object.assign({}, store, { isFetching: true });
  case ITEM_UPDATED:
    return Object.assign({}, store, { isFetching: false }
    );
  default:
    return store;
  }
};

export default todoReducer;