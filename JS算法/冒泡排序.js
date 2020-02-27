const chunk = (arr) => {
  for (let i = arr.length - 1; i >= 1; i--) {
    for (let j = 1; j <= i; j++) {
      arr[j - 1] > arr[j] && dep(arr, j - 1, j);
    }
  }
}
const dep = (arr, i, j) => {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

const arr1 = [1, 4, 2, 5, 6, 8, 9, 3,234,56,234,62,465,234];
console.time('default')
chunk(arr1);
console.timeEnd('default')
console.log(process.memoryUsage())

const sort3 = (arr) => {
  let min = 0
  let max = arr.length - 1
  while (min < max) {
    for (let i = min; i < max; i++) {
      if (arr[i] > arr[i + 1]) {
        ;[arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]
      }
    }
    max--
    for (let j = max; j > min; j--) {
      if (arr[j] < arr[j-1]) {
        ; [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
      } 
    }
    min ++ 
  }
}
const arr2 = [1, 4, 2, 5, 6, 8, 9, 3,234,56,234,62,465,234];
console.time('sort')
sort3(arr2)
console.timeEnd('sort')
console.log(process.memoryUsage())