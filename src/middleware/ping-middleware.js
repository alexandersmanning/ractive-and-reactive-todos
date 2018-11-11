import { PING, PONG } from '../actions/ping-actions';
import { mapTo, delay } from 'rxjs/operators'
import { ofType } from 'redux-observable'

export const pingEpic = action$ => (
  action$.pipe(
    ofType(PING),
    delay(1000),
    mapTo({ type: PONG }),
  )
);