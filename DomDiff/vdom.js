
const createElement = (type, props, ...children) => {
  return {
    props: {
      flag, // 类型
      type,
      props,
      children,
    }
  }
}

const render = (target, container) => {

}