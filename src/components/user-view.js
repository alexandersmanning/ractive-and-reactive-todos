import RactiveBridge from '../bridge';
import template from './user-view-tpl.html';

const userViewComponent = RactiveBridge.extend({
  template: template,
});

export default userViewComponent;