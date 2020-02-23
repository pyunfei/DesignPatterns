import * as types from '../type';

const increment = (payload) => {
  return { type: types.INCREMENT, payload }
}

export default{ increment }