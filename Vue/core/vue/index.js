import { initState } from './observer'
import { compiler, util } from './util'
import Watcher from './observer/watcher';

function Vue(options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  let vm = this;
  vm.$options = options;

  // 初始化各种钩子以及状态
  initState(vm);

  // 渲染
  if (vm.$options.el) {
    vm.$mount()
  }
}

Vue.prototype.$mount = function () {
  let vm = this;
  let el = vm.$options.el;
  // $el 需要挂载的元素
  el = vm.$el = util.query(el);

  // 每次都是依赖于 Watcher 来更新, 组件级别

  // 渲染, 更新组件
  let updateComponent = () => {
    // 组件更新
    vm._update();
    // @todo render 
  };

  // 渲染 watcher
  new Watcher(vm, updateComponent);

}

Vue.prototype._update = function () {
  // 获取用户数据更新试图
  let vm = this;
  let el = vm.$el;

  let firstChild;
  let node = document.createDocumentFragment();
  while (firstChild = el.firstChild) {
    node.appendChild(firstChild);
  }
  // 替换文本
  compiler(node, vm)
  el.appendChild(node);

  // 依赖收集 属性变化需要重新渲染 watcher dep


}





export default Vue;