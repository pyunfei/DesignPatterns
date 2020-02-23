import * as types from '../type';

const decrement = (payload) => {
  return { type: types.DECREMENT, payload }
}

export default { decrement }