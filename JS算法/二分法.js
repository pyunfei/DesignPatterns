const search = (arr, target) => {
  let left = 0,
    right = arr.length - 1,
    lowIndex;
  while (left <= right) {
    lowIndex = Math.floor((left + right) / 2)

    if (arr[lowIndex] === target) return lowIndex
    else if (arr[lowIndex] > target) right = lowIndex - 1
    else left = lowIndex + 1
  }
  return 'sorry'
}

const arr = [3, 5, 7, 19, 33, 36, 39, 49, 50, 60, 68, 78, 86, 89, 90];
console.log(search(arr, 89))