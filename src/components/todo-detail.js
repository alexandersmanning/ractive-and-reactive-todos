import RactiveBridge from "../bridge";
import store from '../store';

import {updateTodoItem} from "../actions/todo-actions";

import { map, debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

export default RactiveBridge.extend({
  oninit() {
    this.onStream('updateItem')
      .pipe(
        debounce(() => interval(500)),
        map(({ context, args }) => args[0])
      )
      .subscribe((item) => { store.dispatch(updateTodoItem(item)); }
      )
  },
  template: `
    {{ #item }}
    <div>
      <div>
        <label>
          <span>Name: </span>
          <input
            type="text"
            value="{{name}}"
            on-input="['updateItem', this]"
          />
        </label>
      </div>
      <div>
        <label>
          <span>Details: </span>
          <input
            type="text"
            value="{{description}}"
            on-input="['updateItem', this]"
          />
        </label>
      </div>
    </div>
    {{ /item }}
  `,
})