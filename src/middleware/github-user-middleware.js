import {
  FETCH_USERS,
  GET_USER,
  receiveUser,
  receiveError,
  setUser,
  isFetching,
  stopFetching,
} from "../actions/github-user-actions";

import { concat, of } from 'rxjs';
import {switchMap, catchError, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';

export const fetchEpic = action$ => (
  action$.pipe(
    ofType(FETCH_USERS),
    switchMap((action) => (
      concat(
        of(isFetching()),
        ajax.getJSON(` https://api.github.com/search/users?q=${action.payload}`)
          .pipe(
            map(({items}) => receiveUser(items)),
            catchError(({ response }) => of(receiveError(response)))
          ),
        of(stopFetching()),
      )
    ))
  )
);

export const setUserEpic = (action$, state$) => (
  action$.pipe(
    ofType(GET_USER),
    map((action) => (
      setUser(state$.value.github.users[action.payload])
    )),
  )
);
