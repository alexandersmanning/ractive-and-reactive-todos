import RactiveBridge from "./bridge";
import template from './root-tpl.html';
import store from './store';
import { ping } from './actions/ping-actions'
import githubUserComponent from "./components/github-user";

document.addEventListener('DOMContentLoaded', () => {
  RactiveBridge.components.githubUsers = githubUserComponent;
  const root = new RactiveBridge({
    template: template,
    el: '#root',
    oninit() {
      this.set('isPinging', store.getState().ping.isPinging);

      store.subscribe(() => {
        this.set('isPinging', store.getState().ping.isPinging);
      })
    },
    clickAction() {
      store.dispatch(ping());
    }
  })
});