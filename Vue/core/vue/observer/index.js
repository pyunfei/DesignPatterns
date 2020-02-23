import Observe from './observe';

export const initState = (vm) => {
  // 开始初始化
  let options = vm.$options;

  if (options.data) {
    initDate(vm);
  }
  if (options.watch) {
    initWatch();
  }
  if (options.computed) {
    initComputed();
  }
}

/**
 * 属性判断代理层
 * @param {*} data 
 */
export const observe = (data) => {
  if (typeof data !== 'object' || typeof data == null) {
    return; //无法劫持
  }
  return new Observe(data)
}

/**
 * 所有的操作代理到临时属性
 * @param {vm} vm 
 * @param {_data} target 
 * @param {key} key 
 */
const proxy = (vm, target, key) => {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
      vm[target][key] = newValue;
    }
  })
}

function initDate(vm) {
  let data = vm.$options.data;
  // 程序设计原则, 不修改原有
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

  // 代理第一层 vm.xxx = vm._data.xxx  所有的操作代理到临时属性上_
  for (let key in data) {
    proxy(vm, '_data', key);
  }

  // 核心观察数据
  observe(vm._data);
}

const initWatch = () => {

}
const initComputed = () => {

}
