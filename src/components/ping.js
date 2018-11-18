import RactiveBridge from '../bridge';
import { map } from 'rxjs/operators';

import { ping } from '../actions/ping-actions'
import store from '../store';

import styles from '../styles/app.scss';

const pingComponent = RactiveBridge.extend({
  template: `
    <div>
      <h2 class="${styles.alex__test}">Is Pinging</h2>
      <div class="${styles.alex__test}">{{ isPinging }}</div>
      <button class="${styles.alex__test}" on-click="clickAction">Click me!</button>
    </div>
  `,
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
