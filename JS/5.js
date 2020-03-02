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
  let a = { name: 2 }
  function A() {
    let name = 1;
    fn = () => {
      console.log(this.name)
    }
    return fn;
  }
  A.bind(a)()()
}

{
  async function getDate() {
    return await Promise.resolve('你猜啊');
  }
  const data = getDate();
  console.log(data)
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