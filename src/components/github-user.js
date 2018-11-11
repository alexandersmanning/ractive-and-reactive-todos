import Ractive from 'ractive';
import template from './github-user-tpl.html';
import store from '../store';
import { interval, fromEventPattern } from 'rxjs'
import {map, debounce, filter} from 'rxjs/operators';
import {fetchUser, getUser} from "../actions/github-user-actions";

const githubUserComponent = Ractive.extend({
  template: template,
  on: {
    init() {
      this.setLocal(store.getState().github);
      store.subscribe(() => {
        this.setLocal(store.getState().github);
      });

      this.stream('inputText')
        .pipe(
          debounce(() => interval(500)),
          map(([current,,]) => current),
          filter((current) => current.length),
        ).subscribe((text) => store.dispatch(fetchUser(text)));
    },
    loginSelected(context) {
      const data = context.event.target.dataset;
      if ('id' in data) store.dispatch(getUser(data.id))
    },
  },
  stream(eventName) {
    return fromEventPattern(
      (h) => { this.observe(eventName, h) },
    )
  },
  setLocal({ users, currentUser, isFetching, errors }) {
    return this.set({ users, currentUser, isFetching, errors });
  }
});

export default githubUserComponent;