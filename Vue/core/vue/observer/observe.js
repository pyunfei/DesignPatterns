import { newArrayProtoMethods, observeArray } from './array';
import { observe } from '.';
import Dep from './dep';

class Observe {
  constructor(data) {
    // 监听数据, 区分
    if (Array.isArray(data)) {
      // prototype
      data.__proto__ = newArrayProtoMethods;
      // [] 操作 [{}] 观察
      observeArray(data)
    } else {
      this.walk(data)
    }
  }

  walk(data) {
    // 结构出data
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];

      defineReactive(data, key, value)
    }
  }
}

export const defineReactive = (data, key, value) => {
  // 递归
  observe(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        // 订阅每个渲染的watcher
        dep.depend();
      }
      return value
    },
    set(newValue) {
      if (newValue === value) return
      observe(newValue);
      value = newValue;
      dep.notify();
      console.log('设置',newValue)
    }
  })
}

export default Observe;