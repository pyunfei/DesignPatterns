export const util = {
  // 返回元素
  query(el) {
    if (typeof el === 'string') {
      return document.querySelector(el);
    }
    return el;
  },
  // 文本替换 {{ name }} {{ work.name }}
  compileText(node, vm) {
    // 增加自定义节点属性, 方便更新
    if (!node.expr) {
      node.expr = node.textContent;
    }
    node.textContent = node.textContent.replace(/\{\{((?:.|\r?\n)+?)\}\}/g, (...args) => {
      return this.getValue(vm, args[1]);
    })
  },
  // 切割多层数据参数 work.name
  getValue(vm, args) {
    let keys = args.split('.'); // [work,name]
    return keys.reduce((prev, current) => {
      prev = prev[current]; // prev = vm.work
      return prev;
    }, vm)
  },
}

/**
* 文本编译替换
* @param {*} node  类数组的文档碎片
* @param {*} vm 
*/
export const compiler = (node, vm) => {
  let childNodes = node.childNodes;
  [...childNodes].forEach(child => {
    // 节点自带属性 1: 元素 3: 文本
    if (child.nodeType === 1) {
      compiler(child, vm); //元素递归
    } else if (child.nodeType === 3) {
      util.compileText(child, vm);
    }
  })
}