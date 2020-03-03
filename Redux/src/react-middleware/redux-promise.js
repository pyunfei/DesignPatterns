export default function ({ getState, dispatch }) {
  // 所有的next都代表下一个中间件
  return function (next) {
      return function (action) {
          if (action.then && typeof action.then === 'function') {
              return action.then(getState, dispatch)
          }
          //不执行函数直接向下一个中间件走
          next(action)
      }
  }
}