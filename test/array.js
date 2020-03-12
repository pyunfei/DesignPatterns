let oldArray = Array.prototype;
let newArray = Object.create(oldArray);
let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'reverse',
  'splice',
];
methods.forEach(name => {
  newArray[name] = function (...args) {
    oldArray[name].apply(this, args);
    switch (name) {
      case 'push':
        console.log('1')
      default:
        break;
    }
    console.log('数组更新')
  }
});

const arr = [1,2,3]
Object.defineProperty(arr,'a',{
  get(){
    return value
  },
  set(newArr){
    value = newArr;
  }
})

arr.push(3)