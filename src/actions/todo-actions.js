export const RECEIVE_LIST = 'RECEIVE_LIST';
export const GET_LIST = 'GET_LIST';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const ITEM_UPDATED = 'ITEM_UPDATED';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const getList = (query) => (
  { type: GET_LIST, payload: query }
);

export const receiveList = (todoList) => (
  { type: RECEIVE_LIST, payload: todoList }
);

export const updateTodoItem = (todoItem) => (
  { type: UPDATE_ITEM, payload: todoItem }
);

export const todoItemUpdated = (todoItem) => (
  { type: ITEM_UPDATED, payload: todoItem }
);

export const setTodoError = (error) => (
  { type: RECEIVE_ERROR, payload: error }
);