/******************************************************* */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallBacks = [];
    this.onRejectedCallBacks = [];
    const resolve = value => {
      // 避免resolve(new Promise)
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if (this.status = PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallBacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status = PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallBacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    const promise = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

      }
      if (this.status === PENDING) {
        this.onResolvedCallBacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        });
        this.onRejectedCallBacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        });
      }
    })
    return promise;
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
  finally(callback) {
    return this.then((data) => {
      return Promise.resolve(callback()).then(() => data)
    }, (reason) => {
      return Promise.reject(callback()).then(() => { throw reason })
    })
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
}

// 递归检测promise
const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    return reject(new TypeError('循环引用'))
  }
  if ((typeof x === 'object' && x !== null) || typeof x == 'function') {
    let called;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, r => {
          if (called) return;
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return;
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let index = 0;
    let processData = (i, v) => {
      arr[i] = data;
      if (index++ === promises.length) {
        resolve(arr);
      }
    }
    for (let i = 0; i < promises.length; i++) {
      let promise = promises[i];
      if (isPromise(promise)) {
        promise.then((data) => {
          processData(i, data)
        }, reject)
      } else {
        processData(i, promise)
      }
    }
  })
}

Promise.race = function (values) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < values.length; i++) {
      let current = values[i];
      if (isPromise(current)) {
        current.then(resolve, reject)
      } else {
        resolve(current)
      }
    }
  })
}

// 检验是否是Promise
const isPromise = value => {
  if ((value !== null && typeof value === 'object') || typeof value === 'function') {
    return typeof value.then === 'function'
  }
  return false
}

Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

module.exports = Promise;