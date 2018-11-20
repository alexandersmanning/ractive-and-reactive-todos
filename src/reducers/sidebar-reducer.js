import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions/sidebar-actions";

export default (store = { open: false }, actions) => {
  switch(actions.type) {
  case OPEN_SIDEBAR:
    return Object.assign({}, store, { open: true });
  case CLOSE_SIDEBAR:
    return Object.assign({}, store, { open: false });
  default:
    return store;
  }
}