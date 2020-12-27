import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore, Store } from "redux"
import { apiMiddleware } from "redux-api-middleware"

import { rootReducer } from "./reducer";

import { RootState } from "./state";


export const configureStore = (initialState?: RootState): Store<RootState> => {
  let middleware = applyMiddleware(thunk, apiMiddleware);

  const store = createStore(rootReducer, initialState, middleware) as Store<RootState>;

  return store;
}