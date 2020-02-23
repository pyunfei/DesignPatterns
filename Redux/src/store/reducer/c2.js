import * as types from '../type';

let initialState = { number: 0 }
export default function c1(stats = initialState, action) {
  switch (action.type) {
    case types.DECREMENT:
      return { number: stats.number - action.payload }
    default:
      return stats
  }
}