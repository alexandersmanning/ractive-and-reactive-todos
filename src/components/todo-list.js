import RactiveBridge from "../bridge";

import { map, debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

import store from '../store';
import { getList, updateTodoItem } from '../actions/todo-actions';

import TodoDetail from './todo-detail'
import Sidebar from './sidebar';
import {closeSidebar, openSidebar} from "../actions/sidebar-actions";

const COMPLETE = 'COMPLETE';
const INCOMPLETE = 'INCOMPLETE';

export default RactiveBridge.extend({
  data() {
    return {
      viewType: INCOMPLETE,
      sidebarOpen: false,
    }
  },
  components: {
    TodoDetail,
    Sidebar,
  },
  oninit() {
    // get list of to do items
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
    });

    this.onStream('updateStatus')
      .pipe(map(({ context, args }) => {
        const [item] = args;
        return item;
      }))
      .subscribe((item) => {
        store.dispatch(updateTodoItem(item));
      });

    this.onStream('setSelected')
      .pipe(map(({ context, args }) => {
        const [item] = args;
        return item;
      }))
      .subscribe(item => {
        this.set('selectedItem', item).then(() => {
          store.dispatch(openSidebar());
        });
      });
  },
  onteardown() {
    // move this to router action
    store.dispatch(closeSidebar());
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
  template: `
    <div>
      <div>List of items</div>
      <div>
        <label>Completed<input type="radio" name="{{ viewType }}" value="COMPLETE"/></label>
        <label>Incomplete<input type="radio" name="{{ viewType }}" value="INCOMPLETE"/></label>
        <label>All<input type="radio" name="{{ viewType }}" value="ALL"/></label>
      </div>
      <label>
        <span hidden>Search Todos</span>
        <input value="{{todoSearch}}" placeholder="Search..."/>
      </label>
      <div>Loading: {{ isLoading }}</div>
      {{ #each todoList as item }}
        <div>
          <input type="checkbox" checked="{{ complete }}" on-change="['updateStatus', item]"/>
          <span on-click="['setSelected', item]">{{ name }}</span>
        </div>
      {{ /each }}
    </div>
    <Sidebar>
      <TodoDetail item="{{selectedItem}}" />
    </Sidebar>
  `,
});