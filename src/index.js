import Ractive from 'ractive';
import template from './root-tpl.html';
import store from './store';
import { ping } from './actions/ping-actions'
import githubUserComponent from "./components/github-user";

document.addEventListener('DOMContentLoaded', () => {
  Ractive.components.githubUsers = githubUserComponent;
  const root = new Ractive({
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