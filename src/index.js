import RactiveBridge from "./bridge";

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