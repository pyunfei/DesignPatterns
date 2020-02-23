function createStore(reducer) {
  let state;
  let listeners = [];
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(fn => fn())
  }
  function subscribe(listener) {
    listeners.push(listener);
    return function () {
      listeners = listeners.filter(fn => fn !== listener)
    }
  }
  dispatch({ type: '@@redux/init' });
  return {
    getState,
    dispatch,
    subscribe
  }
}

export default createStore;