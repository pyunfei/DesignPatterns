const arr = [1, 2, 3, 4, 5];
// const chunk = (arr, num) => {
//   let _arr = arr,
//     _num = num;
//   let index = 0;
//   let newArr = [];
//   if (num === 0) return [];
//   if (num > _arr.length) return _arr;
//   console.time('time:::::')
//   for (let i = 0; i < Math.ceil(_arr.length / num); i++) {
//     newArr.push(_arr.slice(index, _num));
//     index += num;
//     num === 1 ? _num += 1 : _num += index
//   }
//   console.timeEnd('time:::::')
//   return newArr;
// }
// const str = chunk(arr, 1);
// console.log(str)

// const chunk = (arr, num) => {
//   let max = Math.ceil(arr.length / num);
//   let index = 0, number = num;
//   let newArr = [];
//   while (max > 0) {
//     newArr.push(arr.slice(index, number));
//     index += number;
//     num === 1 ? number += 1 : number += index
//     console.log(index, number)
//     max--;
//   }
//   return newArr
// }
const str = chunk(arr, 2);
console.log(str)


