import * as types from '../type';

let initialState = { number: 0 }
export default function c1(state = initialState, action) {
  // console.log(state, action)
  switch (action.type) {
    case types.INCREMENT:
      return { number: state.number + action.payload }
    default:
      return state
  }
}