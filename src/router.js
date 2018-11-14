import ReactiveBridge from './bridge';
import template from './router-tpl.html';

import pingComponent from './components/ping';
import githubUserComponent from "./components/github-user";

import {fromEvent} from "rxjs";

const routerComponent = ReactiveBridge.extend({
  template: template,
  // computed: {
  //   isPing(){ return this.router('ping') },
  //   isGithub(){ return this.router('github') },
  //   isUser(){ return this.router('user') }
  // },
  components: {
    ping: pingComponent,
    github: githubUserComponent,
  },
  router(path) {
    const loc = this.get('@global.location.hash');
    return loc && loc.match(path)
  },
  getParams(path) {
    const loc = this.get('@global.location.hash');
    const idx = loc.match(path);
    path.slice(idx)
  };
  setRoutes() {
    this.set('isPing', this.router('ping'));
    this.set('isGithub', this.router('github'));

    if (this.router('user'))  {
      this.set('isUser', true);
      this.set('user.id', )
      // x.split(/\//).filter(s => s[0] === ':').reduce((acc, s) => ,)
    }
  },
  oninit() {
    fromEvent(window, 'hashchange').subscribe(() => {
      this.setRoutes();
    });

    this.setRoutes();
  }
});

export default routerComponent;
