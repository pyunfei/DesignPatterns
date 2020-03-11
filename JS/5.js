{
  Array.prototype.flat = function (...args) {
    const result = [];
    const _this = this;
    console.log(args)
    function _flat(targetArr) {
      let targetLength = targetArr.length
      for (let i = 0; i < targetLength; i++) {
        const item = targetArr[i];
        if (Array.isArray(item)) {
          _flat(item)
        } else {
          result.push(item)
        }
      }
    }
    _flat(_this);
    return result;
  }
  const arr = [[1], [2, 3, 4], [5, 6, [7, [8]]], 9];
  const result = arr.flat(1, 2, 3);
  console.log(result)
}

{
  Array.prototype.reduce = function (callback, prev) {
    for (let i = 0; i < this.length; i++) {
      if (typeof prev === 'undefined') {
        prev = callback(this[i], this[i + 1], i + 1, this);
        i++;
      } else {
        prev = callback(prev, this[i], i, this)
      }
    }
    return prev;
  }
  const r = [1, 2, 3, 4].reduce((a, b, i, r) => {
    return a + b
  }, 1);
  console.log(r)
}

{
  const throttle = (func, wait = 50) => {
    // 上一次执行该函数的时间
    let lastTime = 0
    return function (...args) {
      // 当前时间
      let now = +new Date()
      // 将当前时间和上一次执行函数时间对比
      // 如果差值大于设置的等待时间就执行函数
      if (now - lastTime > wait) {
        lastTime = now
        func.apply(this, args)
      }
    }
  }

  const debounce = (func, wait = 50) => {
    // 缓存一个定时器id
    let timer = 0
    // 这里返回的函数是每次用户实际调用的防抖函数
    // 如果已经设定过定时器了就清空上一次的定时器
    // 开始一个新的定时器，延迟执行用户传入的方法
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }

  setInterval(
    throttle(() => {
      console.log(2)
    }, 5000),
    1
  )
}

{
  const nest = (items, id = null, link = 'parent_id') =>
    items
      .filter(item => item[link] === id)
      .map(item => ({ ...item, children: nest(items, item.id) }))

  const obj = [
    { id: 1, parent_id: null },
    { id: 2, parent_id: 1 },
    { id: 3, parent_id: 1 },
    { id: 4, parent_id: 2 },
    { id: 5, parent_id: 4 },
  ]
  const newNest = nest(obj);
  console.log(JSON.stringify(newNest, null, 2))
}

{
  const parentSort = (target) => {
    Promise.all(target.map(item => new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', item);
      xhr.responseType = 'json';
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response)
          }
        }
      }
      xhr.send();
    }))).then(res => {
      console.log(res)
    })
  }

  const paintOrder = (target) => {
    const result = [];
    let count = 0;
    target.forEach((item, index) => {
      sendRequest(item, index)
    });
    function sendRequest(item, index) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', item);
      xhr.responseType = 'json';
      xhr.onreadystatechange = function (event) {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            result[index] = event.target.response;
            count++;
            if (count === target.length) {
              console.log(result)
            }
          }
        } else {
          result[index] = event.statusText;
          count++;
          if (count === target.length) {
            console.log(result)
          }
        }
      }
      xhr.send();
    }
  }
}

{
  class MaxNum {
    constructor(max) {
      this._max = max;
      this.maxTarget = [];
    }
    take(task) {
      if (this._max > 0) {
        this._max--;
        task();
      } else {
        this.maxTarget.push(task)
      }
    }
    leave() {
      this._max++;
      const task = this.maxTarget.shift();
      if (task)
        this.take();
    }
  }
  const max = new MaxNum(2);
  console.time("default")
  max.take(() => max.leave(), 1000);
  max.take(() => max.leave(), 2000);
  max.take(() => {
    max.leave();
    console.timeEnd('default')
  }, 3000);
}

{
  
}

{
  var a = 0;
  async function test() {
    let result = a + await 10;
    console.log(result);
  }

  var a = 0;
  async function test() {
    let result = await 10 + a;
    console.log(result);
  }

  var num = 10;
  var obj = {
    num : 8,
    inner: {
      num: 6,
      print:function(){
        console.log(this.num)
      }
    }
  }
  num = 888;
  obj.inner.print();
  var fn = obj.inner.print;
  fn();
  (obj.inner.print = obj.inner.print)();
}