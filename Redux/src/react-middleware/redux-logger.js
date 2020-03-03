// 获取状态 派发改造后的状态
export default function ({ getState, dispatch }) {
  // 下一个中间件, 洋葱模型
  return function (next) {
    // 动作
    return function (action) {
      console.log('%c prev state', 'font:bold;color:gray', getState())
      console.log('%c  action', 'font:bold;color:green', action)
      next(action)
      console.log('%c next state', 'font:bold;color:blue', getState())
    }
  }
}

// store使用
// let oldStore = store.dispatch
// store.dispatch = function(action){
//     console.log('%c prev state','font:bold;color:gray',store.getState())
//     console.log('%c  action','font:bold;color:green',action)
//     oldStore(action)
//     console.log('%c next state','font:bold;color:blue',store.getState())
// }