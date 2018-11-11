import ReactiveBridge from './bridge';
import template from './router-tpl.html';

import pingComponent from './components/ping';
import githubUserComponent from "./components/github-user";

import {fromEvent} from "rxjs";

const routerComponent = ReactiveBridge.extend({
  template: template,
  computed: {
    isPing(){ return this.router('ping') },
    isGithub(){ return this.router('github') },
  },
  components: {
    ping: pingComponent,
    github: githubUserComponent,
  },
  router(path) {
    const loc = this.get('@global.location.hash');
    return loc && `#${path}`.match(loc)
  },
  oninit() {
    fromEvent(window, 'hashchange').subscribe(() => {
      this.update('@global.location.hash')
    })
  }
});

export default routerComponent;
