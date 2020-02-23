let id = 0;
// 收集一个个的 watcher 依赖 一旦依赖改变就会执行每个watcher上的update
class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
  depend() {
    if (Dep.target) {
      // 让watcher与dep双向指认
      Dep.target.addDep(this);
    }
  }
}

//  收集到改变的依赖 存取当前的watcher
let stack = [];
export const pushTarget = (watcher) => {
  Dep.target = watcher;
  stack.push(watcher);
}

export const popTarget = () => {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}

export default Dep;