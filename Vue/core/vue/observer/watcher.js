import { pushTarget, popTarget } from "./dep";

let uid = 0;
class Watcher {
  /**
   * 渲染 计算属性 watch 都需要依赖该方法
   * @param {*} vm 实例
   * @param {*} exprOrFn 函数、表达式
   * @param {*} cb  vm.$watch('msg',cb) msg也可能代表exprOrFn
   * @param {*} options 其他参数
   */
  constructor(vm, exprOrFn, cb = () => { }, options = {}) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;
    this.deps = [];
    this.depsId = new Set();
    this.uid = uid++;

    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn;
    }
    // 创建一个watcher就会执行一次get , 确保每次渲染更新逻辑都不一样， 并且都会执行
    this.get();
  }
  get() {
    // 渲染watcher 改变需要 让这个watcher重新执行
    pushTarget(this);
    this.getter();
    popTarget();
  }
  // 与dep上的watcher 呼应  递归渲染
  update() {
    // this.get();
    // 队列批量更新
    queueWatcher(this);
  }
  run() {
    this.get();
  }
  // 与dep上的watcher相互指认
  addDep(dep) {
    let id = dep.id;
    // 不需要存储同一个dep的id的watcher
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
}

let queue = []
let has = {};
const queueWatcher = (watcher) => {
  let id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher)
    // 延迟队列
    // setTimeout(flushQueue,0) 
    nextTick(flushQueue)
  }
}

let callbacks = [];
const nextTick = (cb) => {
  callbacks.push(cb);
  let timerFunc = () => {
    flushCallbacks();
  }
  // 可以选取多种异步方式, 微任务 宏任务 都可以, 
  if (Promise) {
    return Promise.resolve().then(timerFunc)
  }
  if (MutationObserver) {
    let observe = new MutationObserver(timerFunc);
    let textNode = document.createTextNode(1);
    observe.observe(textNode, { characterData: true });
    textNode.textContent = 2;
    return
  }
  if (setImmediate) {
    return setImmediate(timerFunc)
  }
  if (setTimeout) {
    setTimeout(timerFunc, 0)
  }
}

const flushCallbacks = () => {
  callbacks.forEach(fn => fn());
}

// 批处理, 完后重置
const flushQueue = () => {
  queue.forEach(watcher => watcher.run());
  has = {};
  queue = [];
}

export default Watcher;