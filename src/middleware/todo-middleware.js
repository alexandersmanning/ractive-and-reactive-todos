import { GET_LIST, receiveList } from "../actions/todo-actions";

import { from } from 'rxjs';
import { map, switchMap, delay } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const todoGetListEpic = action$ => (
  action$.pipe(
    ofType(GET_LIST),
    delay(500),
    switchMap((action) => (
      from(new Promise((resolve, reject) => (
        resolve([
          { name: 'Learn RxJs', description: 'Become a master at RxJs through practice', complete: false },
          { name: 'Learn Ractive', description: 'Keep hammering away at Ractive and docs', complete: false },
          { name: 'Review Redux', description: 'Review the common redux patterns that you have used in the past', complete: false },
          { name: 'Get SASS working', description: 'Get SASS working within the app', complete: true },
        ])
      ))).pipe(
        map(items => (
          items.filter(item => item.name.match(action.payload || ''))
        )),
        map(list => receiveList(list))
      )
    ))
  )
);