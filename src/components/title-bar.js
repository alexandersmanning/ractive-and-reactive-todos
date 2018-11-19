import RactiveBridge from "ractive";
import style from '../styles/header-bar.scss';

export default RactiveBridge.extend({
  template: `
    <div class="${style.header__container}">
      <div class="${style["header__title-container"]}">
        <div class="${style.header__title}">RxTodos</div>
      </div>
    </div>
  `
});
