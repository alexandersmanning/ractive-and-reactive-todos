import { createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import pingReducer from './reducers/ping-reducer';
import githubUserReducer from "./reducers/github-user-reducer";
import todoReducer from "./reducers/todo-reducer";

// Middleware
import { pingEpic } from './middleware/ping-middleware';
import { fetchEpic, setUserEpic } from "./middleware/github-user-middleware";
import { todoGetListEpic } from './middleware/todo-middleware';

const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({
  ping: pingReducer,
  github: githubUserReducer,
  todos: todoReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(combineEpics(pingEpic, fetchEpic, setUserEpic, todoGetListEpic));

export default store;