import RactiveBridge from "../bridge";

import { map, debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

import store from '../store';
import { getList, updateTodoItem } from '../actions/todo-actions';
import {closeSidebar, openSidebar} from "../actions/sidebar-actions";

import TodoDetail from './todo-detail'
import Sidebar from './sidebar';
import Dropdown from './dropdown';

import style from '../styles/todo-body.scss';

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
    Dropdown
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

    this.onStream('updateViewType')
      .pipe(
        map(({ context, args }) => args[0])
      )
      .subscribe((viewState) => {
        this.set('viewType', viewState);
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
    <div class="${style.body__container}">
      <div>
        <div class="${style.header__container}">
          <Dropdown
            on-dropdownSelect="updateViewType"
            currentSelected="{{ viewType }}"
            items="[
              { value: '${INCOMPLETE}', label: 'Incomplete'},
              { value: '${COMPLETE}', label: 'Completed'},
              { value: 'ALL', label: 'All'}
            ]"
          ></Dropdown>
          <span style="margin-left: 10px;">Items</span>
        </div>
        <div>
          <label>
            <span hidden>Search Todos</span>
            <input value="{{todoSearch}}" placeholder="Search..."/>
          </label>
          <div>Loading: {{ isLoading }}</div>
          {{ #each todoList as item }}
            <div fly-in-out>
              <input type="checkbox" checked="{{ complete }}" on-change="['updateStatus', item]"/>
              <span on-click="['setSelected', item]">{{ name }}</span>
            </div>
          {{ /each }}
        </div>
      </div>
    </div>
    <Sidebar>
      <TodoDetail item="{{selectedItem}}" />
    </Sidebar>
  `,
});