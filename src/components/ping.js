import RactiveBridge from '../bridge';
import template from './ping-tpl.html';

import { map } from 'rxjs/operators';

import { ping } from '../actions/ping-actions'
import store from '../store';

const pingComponent = RactiveBridge.extend({
  template: template,
  oninit() {
    this.set('isPinging', store.getState().ping.isPinging);

    store.subscribe(() => {
      this.set('isPinging', store.getState().ping.isPinging);
    });

    this.onStream('clickAction')
      .pipe(
        map(({ context }) => true )
      ).subscribe(() => {
        store.dispatch(ping())
      });
  }
});

export default pingComponent;
