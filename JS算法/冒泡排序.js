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

const arr = [1, 4, 2, 5, 6, 8, 9, 3];
chunk(arr);
console.log(arr);