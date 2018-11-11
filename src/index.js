import RactiveBridge from "./bridge";

import template from './root-tpl.html';
import routerComponent from './router';
import navLinkComponent from "./components/nav-link";


document.addEventListener('DOMContentLoaded', () => {
  const root = new RactiveBridge({
    template: template,
    el: '#root',
    components: {
      router: routerComponent,
      navLink: navLinkComponent,
    },
  })
});