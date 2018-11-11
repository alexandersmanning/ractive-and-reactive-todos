import { PING, PONG} from '../actions/ping-actions';

const pingReducer = (state = { isPinging: false }, action) => {
  switch(action.type) {
  case PING:
    return { isPinging: true };
  case PONG:
    return { isPinging: false };
  default:
    return state;
  }
};

export default pingReducer;
