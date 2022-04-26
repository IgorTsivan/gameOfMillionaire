import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { gameReducer } from './reducer';

const rootReducer = combineReducers({
  game: gameReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default createStore(rootReducer, applyMiddleware(thunk));
