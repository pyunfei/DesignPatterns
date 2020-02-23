import { observe } from ".";

let oldArrayProtoMethods = Array.prototype;
export let newArrayProtoMethods = Object.create(oldArrayProtoMethods);
let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'reverse',
  'splice',
]

/**
 * push pop shift unshift sort reverse splice
 * @param {*} data 
 */
methods.forEach(name => {
  newArrayProtoMethods[name] = function (...args) {
    oldArrayProtoMethods[name].apply(this, args)
    // @todo 举例：[{}]
    let inserted;
    switch (name) {
      case 'push':
      case 'unshift':
        inserted = args;
      case 'splice':
        inserted = args.slice(2);
      default:
        break;
    }

    if (inserted) observeArray(inserted)
    
    console.log('数组更新')
  }
});

/**
 * 观察数组中新增的每一项
 * @param {*} inserted 
 */
export const observeArray = (inserted) => {
  for (let i = 0; i < inserted.length; i++) {
    observe(inserted[i])
  }
}