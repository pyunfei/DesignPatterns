// 问题
function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i)
    }
  }
  return arr
}
var demo = test();
for (var j = 0; j < 10; j++) {
  demo[j]()
}
// 十个 10

// 解决
//1: var --> let
//2: (arr[j] = function(){console.log(j)})(i) 立即执行函数
// 每个立即执行函数都会产生一个独一无二的AO 保存传入的变量
