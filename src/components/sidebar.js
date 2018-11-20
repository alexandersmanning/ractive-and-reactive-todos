import RactiveBridge from '../bridge';
import store from '../store';

import { closeSidebar } from '../actions/sidebar-actions'

export default RactiveBridge.extend({
  template: `
    {{ #if open }}
    <div>
      <div>
        <div>
          <div on-click="closeSidebar">X</div>
        </div>
        <div>{{yield}}</div>
      </div>
    </div>
    {{ /if }}
  `,
  data() {
    return { open: false }
  },
  oninit() {
    store.subscribe(() => {
      const { open } = store.getState().sidebar;
      this.set({ open });
    });

    this.onStream('closeSidebar')
      .subscribe(() => {
        store.dispatch(closeSidebar())
      });
  },
});