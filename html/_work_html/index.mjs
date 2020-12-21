const fn1 = (n) => n;
const action = new Map([
  [0, fn1],
  [1, fn2],
]);
const map = n => action.get(n);

const getMap = map(0);
console.log(getMap());

// const result = await request();
// const _result = format(result.slice());

// const util = _result => {
//   const _ = {
//     'xxx': function(){},
//     'yyy': function(){},
//   }

//   return _[_result]
// }


const formatTree = (targets, id = null, link = 'target_id') => {
  targets
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: formatTree(targets, item.id) }))
};


// 多次请求缓存
const request = (url, options) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ data: options })
  }, 2000)
})
const cache = new Map();
const cacheRequest = (url, options) => {
  let key = `${url}:${options.method}`;
  if (cache.has[key]) {
    if (cache.get(key).status === 'pending') {
      return cache.get(key).myWait;
    }
    return Promise.resolve(cache.get(key).data)
  } else {
    let requestApi = request(url, options);
    cache.set(key, { status: 'pending', myWait: requestApi })
    return requestApi.then(res => {
      cache.set(key, { status: 'success', data: res })
      return Promise.resolve(res);
    }).catch(err => {
      cache.set(key, { status: 'fail', data: err });
      Promise.reject(err);
    })
  }
}
cacheRequest('').then(res => {
  console.log('res1', res)
})
cacheRequest('').then(res => {
  console.log('res2', res)
})
setTimeout(() => {
  cacheRequest().then(res => console.log('res3', res))
}, 4000)


{
  const data = [1, 2, 3, 4, 5, 6]
  for (const { key, value } of data || []) {
    console.log(key, value);
  }
}


{
  const errorParser = async asyncFunc => {
    const tag = Object.prototype.toString.call(asyncFunc);
    if (tag !== '[object Function]') {
      throw new Error(`${asyncFunc} is not a function`)
    } else {
      try {
        const res = await asyncFunc();
        return [null, res]
      } catch (e) {
        return [e, null]
      }
    }
  }

  const test = async api => {
    const [err, res] = await errorParser(api);
    if (!err) { }
  }

  test(api)
}