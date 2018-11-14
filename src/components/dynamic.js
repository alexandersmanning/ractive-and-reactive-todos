import RactiveBridge from "../bridge";

RactiveBridge.extend({
  template: `
    <component>
      {{#if childStates }}
        <dynamic name="{{nextName}}" nextStates="{{childStates}}"></dynamic>
      {{/if}}
    </component>
  `,
  component: {
    component() {
      return this.get('name');
    },
    oninit() {
      // this.observStream('name')
      //   .subscribe(() => {
      //     this.reset();
      //   });
      const childStates = this.get('childStates');
      if (childStates && childStates.length) {
        this.set('nextName', childStates[0])
      }
      this.observe('name', function(){
        this.reset();
      }, { init: false});
    }
  }
});