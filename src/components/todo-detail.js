import RactiveBridge from "../bridge";
import store from '../store';
import style from '../styles/details.scss';

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
        <label class="${style["detail__input-container"]}">
          <div>Name</div>
          <input
            class="${style.detail__input}"
            type="text"
            value="{{name}}"
            on-input="['updateItem', this]"
          />
        </label>
      </div>
      <div>
        <label class="${style["detail__input-container"]}">
          <div>Details</div>
          <textarea on-input="['updateItem', this]" class="${style.detail__textarea}">{{ description }}</textarea>
        </label>
      </div>
    </div>
    {{ /item }}
  `,
})