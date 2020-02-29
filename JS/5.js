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
