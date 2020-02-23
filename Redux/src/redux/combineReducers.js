function combineReducers(reducers) {
  let reducerKeys = Object.keys(reducers);
  return function (state = {}, action) {
    let hashChanged = false;
    const nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const prevStateForKey = state[key];
      const reducer = reducers[key];
      const nextStateForKey = reducer(prevStateForKey, action)
      nextState[key] = nextStateForKey;
      hashChanged = hashChanged || nextStateForKey !== prevStateForKey
    }
    return hashChanged ? nextState : state
  }
}
export default combineReducers;
  