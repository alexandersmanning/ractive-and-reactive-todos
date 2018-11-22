import RactiveBridge from '../bridge';
import style from '../styles/sidebar.scss';

import store from '../store';

import { closeSidebar } from '../actions/sidebar-actions'

export default RactiveBridge.extend({
  template: `
    {{ #if open }}
    <div
      fade-in-out
      class="${style.sidebar__container}"
      on-click="closeSidebar"
    ></div>
    <div class="${style.sidebar__body}" fly-in-out="{x: 500 }">
      <div class="${style.sidebar__header}">
        <div class="${style["sidebar__header-close"]} fas fa-times" on-click="closeSidebar"></div>
      </div>
      <div>{{yield}}</div>
    </div>
    {{ /if }}
  `,
  data() {
    return { open: false }
  },
  oninit() {
    store.subscribe(() => {
      const { open } = store.getState().sidebar;
      this.set('open', open);
    });

    this.onStream('closeSidebar')
      .subscribe(() => {
        store.dispatch(closeSidebar())
      });
  },
});