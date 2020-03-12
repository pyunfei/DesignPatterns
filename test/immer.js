// import produce from "immer"

const baseState = [
  {
    todo: "Learn typescript",
    done: true
  },
  {
    todo: "Try immer",
    done: false
  }
]

console.log(baseState)

const produce = (baseState, callback) => {
  const draftState = JSON.parse(JSON.stringify(baseState))
  return callback(draftState);
}

const nextState = produce(baseState, draftState => {
  switch (_) {
    case 'true':
      draftState.push({ todo: "Tweet about it" })
      draftState[1].done = true
      return draftState
    default:
      return draftState;
  }
})

console.log(nextState)