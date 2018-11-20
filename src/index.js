import RactiveBridge from "./bridge";
import fade from 'ractive-transitions-fade';
import slide from 'ractive-transitions-slide';
import fly from 'ractive-transitions-fly';

import Header from './components/title-bar';
import TodoList from './components/todo-list';

document.addEventListener('DOMContentLoaded', () => {
  const root = new RactiveBridge({
    template: `
      <Header/>
      <TodoList />
    `,
    el: '#root',
    components: {
      Header,
      TodoList,
    }
  })
});

RactiveBridge.transitions.fade = fade;
RactiveBridge.transitions.slide = slide;
RactiveBridge.transitions.fly = fly;
