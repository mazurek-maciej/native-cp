import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore, Store } from "redux"
import { apiMiddleware } from "redux-api-middleware"

import { rootReducer } from "./reducer";

import { RootState } from "./state";


export const configureStore = (initialState?: RootState): Store<RootState> => {
  let middleware = applyMiddleware(thunk, apiMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    middleware = composeEnhancers(middleware);
  }

  const store = createStore(rootReducer, initialState, middleware) as Store<RootState>;

  return store;
}