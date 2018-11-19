import RactiveBridge from "../bridge";

import { map, startWith, debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

import store from '../store';
import { getList } from '../actions/todo-actions';

const COMPLETE = 'COMPLETE';
const INCOMPLETE = 'INCOMPLETE';

export default RactiveBridge.extend({
  data() {
    return {
      viewType: INCOMPLETE,
    }
  },
  template: `
    <div>
      <div>List of items</div>
      <div>
        <label>Completed<input type="radio" name="{{ viewType }}" value="COMPLETE"/></label>
        <label>Incomplete<input type="radio" name="{{ viewType }}" value="INCOMPLETE"/></label>
        <label>All<input type="radio" name="{{ viewType }}" value="ALL"/></label>
      </div>
      <label>
         Search TODOs: 
        <input value="{{todoSearch}}"/>
      </label>
      <div>Loading: {{ isLoading }}</div>
      {{ #each todoList as item }}
        <div>
          <span>{{ name }}</span>
        </div>
      {{ /each }}
    </div>
  `,
  oninit() {
    // get list of todos
    store.subscribe(() => {
      const { list, isFetching } = store.getState().todos;
      this.set({ 'isLoading': isFetching });

      this.setView(this.get('viewType'));
    });

    // starts with not needed here since todoSearch initializes at ''
    this.observeStream('todoSearch')
      .pipe(
        debounce(() => interval(500)),
        map(([current,,]) => current),
      ).subscribe((text) => {
        store.dispatch(getList(text))
    });

    this.observeStream('viewType')
      .pipe(
        map(([current,,]) => current)
      ).subscribe((viewState) => {
        this.setView(viewState);
    })
  },
  setView(viewState) {
    const { list } = store.getState().todos;
    let todoList;

    switch(viewState) {
    case COMPLETE:
      todoList = list.filter(item => item.complete);
      break;
    case INCOMPLETE:
      todoList = list.filter(item => !item.complete);
      break;
    default:
      todoList = list;
      break;
    }

    this.set({ todoList });
  },
});