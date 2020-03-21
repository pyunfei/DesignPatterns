// Object.defineProperty只会监控原数组内存地址

const arr = [1, 2, 3];

const observer = data => {
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  })
}

const defineReactive = (data,key, value) => {
  Object.defineProperty(data, key, {
    get(){
      console.log(`获取到了${key}---${value}`)
      return value
    },
    set(newValue) {
      console.log(`设置了${key}---${value}`)
      value = newValue
    }
  })
}

observer(arr)
arr.unshift(0)
arr.pop()
console.log(arr)