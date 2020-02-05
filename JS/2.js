/**
 * 自执行函数
 * (function(){}()) 推荐
 * (function(){})()
 */

// 函数声明不能被直接执行 
function a() { }

// 函数表达式可以执行
const a = function a() { }()

  + function () { console.log('0') }()


// test
function test(a, b, c, d) {
  console.log(a + b + c + d)
} (1, 2, 3, 4)
// 不报错但是也不执行