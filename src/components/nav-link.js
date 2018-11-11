import RactiveBridge from "../bridge";
import template from './nav-link-tpl.html';

import { map } from 'rxjs/operators';

const navLinkComponent = RactiveBridge.extend({
  template: template,
  oninit() {
    this.onStream('updatePath').pipe(
      map(({ context, args }) =>  args[0] )
    ).subscribe((path) => {
      location.hash = `#${path}`;
    })
  }
});

export default navLinkComponent;
