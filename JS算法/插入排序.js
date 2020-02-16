const arr = [1, 3, 5, 7, 9, 10];
const target = 8;

const targetNum = arr.find(a => a > target);
const targetIndex = arr.indexOf(targetNum);
arr.splice(targetIndex === -1 ? arr.length : targetIndex, 0, target);
console.log(arr)