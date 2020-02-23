/**
 * 
 * @param {元素类型} type 
 * @param {元素属性等等等} props 
 * @param  {子元素} children 
 */
function createElement(type, props, ...children) {
  delete props.__source;
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'object' ? child : createTextElement(child)
      })
    }
  }
}

/**
 * @param {创建文本元素}
 * @param {文本元素} child 
 */
function createTextElement(child) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: child,
      children: []
    }
  }
}

/**
 * 构建虚拟dom
 * @param {dom结构} vdom 
 */
function createDom(vdom) {
  const dom = vdom.type === 'TEXT'
    ? document.createTextNode('')
    : document.createElement(vdom.type);
  // Object.keys(vdom.props)
  //   .filter(key => key !== 'children')
  //   .forEach(name => {
  //     // @todo 事件处理 属性兼容
  //     dom[name] = vdom.props[name]
  //   })
  updateDom(dom, {}, vdom.props)
  return dom
  // console.log(dom)
}

/**
 * 更新dom
 * @param {更新的目标元素} dom 
 * @param {更新前} prevProps   
 * @param {更新后} nextProps 
 */
function updateDom(dom, prevProps, nextProps) {
  //1. children 属性
  //1. prev 存在 取消
  //1. next 新增  <属性二次判断>
  // @todo... 此处省略一万行兼容处理
  Object.keys(prevProps)
    .filter(name => name !== 'children')
    .filter(name => !(name in nextProps))
    .forEach(name => {
      if (name.slice(0, 2) === 'on') {
        // 事件询问符 onClick --> click
        dom.removeEventListener(name.slice(0, 2).toLowerCase(), prevProps[name], false)
      } else {
        dom[name] = '';
      }
    });
  Object.keys(nextProps)
    .filter(name => name !== 'children')
    .forEach(name => {
      if (name.slice(0, 2) === 'on') {
        // 事件询问符 onClick --> click
        dom.addEventListener(name.slice(0, 2).toLowerCase(), prevProps[name], false)
      } else {
        dom[name] = nextProps[name];
      }
    });
}

function commitRoot() {
  deletions.forEach(commitWorker)
  commitWorker(workInprogressRoot.child);
  currentRoot = workInprogressRoot;
  workInprogressRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return
  }
  // const domParent = fiber.parent.dom;
  // 函数式组件需要反向递归查找
  let domParentFiber = fiber.parent;
  while (!domParentFiber) {
    domParentFiber = domParentFiber.parent
  }

  const domParent = domParentFiber.dom;

  if (fiber.effectTag === 'REPLACE' && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, domParent)
    // domParent.removeChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    // 更新dom操作
    updateDom(fiber.dom, fiber.base.props, fiber.props)
  }
  // domParent.appendChild(fiber.dom);
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

/**
 * 具体的删除动作
 * @param {*} fiber 
 * @param {*} domParent 
 */
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent)
  }
}

function render(vdom, container) {
  // container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`
  workInprogressRoot = {
    dom: container,
    props: {
      children: [vdom]
    },
    base: currentRoot
  }
  deletions = [];
  nextUnitOfWork = workInprogressRoot

  // vdom.props.children.forEach(child => render(child, dom));
  // container.appendChild(dom);
}

// 将某个任务拆分成多个单元任务, 第一个单元任务会在render初始化时触发
let nextUnitOfWork = null; // 下一个单元任务
let workInprogressRoot = null;  // 保存fiber结构的根节点
let currentRoot = null; // 当前工作的节点
let deletions = null; // 处理所有的删除任务

function workLoop(deadline) {
  //渲染下一个任务, 并且当前帧数没有结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = preformUnitOfWork(nextUnitOfWork)
  }
  // 没有下一个渲染任务, 并且跟节点存在
  if (!nextUnitOfWork && workInprogressRoot) {
    commitRoot(); // 提交任务
  }
  requestidleCallback(workLoop)
}

// 空闲时间 启动处理 <自己实现的仿照浏览器的api>
requestidleCallback(workLoop)

// 获取下一个任务
function preformUnitOfWork(fiber) {
  // 函数式组件
  const isFunctionComponent = fiber.type instanceof Function
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    // dom
    updateHostComponent(fiber)
  }
  // 找下一个任务 
  // 子元素
  if (fiber.child) {
    return fiber.child
  }
  // 兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 无兄弟元素, 回退去找父元素
    nextFiber = nextFiber.parent
  }
}

/**
 * 函数组件
 * @param {*} fiber 
 */
function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

/**
 * 普通dom
 * @param {*} fiber 
 */
function updateHostComponent(fiber) {
  // 根据当前任务, 获取下一个任务
  if (!fiber.dom) {
    fiber.dom = createDom(fiber); //不是入口
  }
  // // 真实的dom操作
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom)
  // }
  const elements = fiber.props.children;

  // 调和元素渲染
  reconcileChildren(fiber, elements);

}

function reconcileChildren(workInprogressFiber, elements) {
  // 构建fiber结构
  let index = 0;
  let oldFiber = workInprogressRoot.base && workInprogressRoot.base.child;
  let prevSibling = null;
  while (index < elements.length && oldFiber != null) {
    let element = elements[index];
    let newFiber = null;

    // oldFiber与elements对比
    // 类型
    const sameType = oldFiber && element && oldFiber.type && element.type
    if (sameType) {
      // 节点复用
      newFiber = {
        type: oldFiber.type,
        props: oldFiber.props,
        dom: oldFiber.dom,
        parent: workInprogressFiber,
        base: oldFiber,
        effectTag: 'UPDATE'
      }
    }
    if (!sameType && element) {
      // 替换
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: workInprogressFiber,
        base: null,
        effectTag: 'REPLACE'
      }
    }
    if (!sameType && oldFiber) {
      // 删除
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      workInprogressFiber.child = newFiber;//第一个节点
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = workInprogressFiber
    index++;
    // fiber节点结构构建完成
  }

}

export default {
  createElement,
  render
}