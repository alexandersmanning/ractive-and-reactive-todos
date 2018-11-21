import RactiveBridge from "../bridge";

import style from '../styles/dropdown.scss'
import { map} from 'rxjs/operators';

export default RactiveBridge.extend({
  template: `
    <div class="${style.dropdown}">
      <div
        class="${style.dropdown__button}"
        on-click="['setVisible']"
      >
        <span style="margin-right: 10px;">{{ currentLabel }}</span>
        <span style="color: rgba(0,0,0,0.35)" class="${style['medium-icon']} fas fa-chevron-down"></span>
      </div>
      <div class="${style.dropdown__body} {{ listVisible ? '${style["dropdown__body--visible"]}' : '${style["dropdown__body--hidden"]}' }}">
        {{ #each items as item }}
          {{ #if item.value !== ~/currentSelected }}
            <div
              class="${style.dropdown__item}"
              on-click="@this.fire('dropdownSelect', value)"
            >{{ label }}</div>
          {{/if}}
        {{ /each }}
      </div>
    </div>
  `,
  setCurrentLabel(current) {
    const foundCurrent = this.get('items').find(item => current === item.value);
    this.set('currentLabel', foundCurrent.label);
  },
  oninit() {
    this.onStream('setVisible')
      .pipe(
        map(() => !this.get('listVisible'))
      ).subscribe((visibility) => {
        this.set('listVisible', visibility);
    });

    this.observeStream('currentSelected')
      .pipe(
        map(([current]) => current)
      ).subscribe((current) => {
        this.set('listVisible', false);
        this.setCurrentLabel(current);
    })
  }
});