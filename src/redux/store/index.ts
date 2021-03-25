import { applyMiddleware, compose, createStore } from "redux";
import reducers from "redux/reducers";
import { loadState, saveState } from "utils/localStorage";
import throttle from "lodash/throttle";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

function configureStore(preLoadedState: any) {
  // const composeEnhancers =
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(reducers, preLoadedState, compose(applyMiddleware(thunk)));
}

const store = configureStore(loadState());

store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;
