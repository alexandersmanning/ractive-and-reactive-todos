export const RECEIVE_LIST = 'RECEIVE_LIST';
export const GET_LIST = 'GET_LIST';

export const getList = (query) => (
  { type: GET_LIST, payload: query }
);

export const receiveList = (todoList) => (
  { type: RECEIVE_LIST, payload: todoList }
);