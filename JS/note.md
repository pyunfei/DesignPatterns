## js基础

this指向总是指向ECstack栈顶, 每次有函数指向都会创建一个当前AO并且指向, 

- AO-->Activation Object  
> 执行期上下文, 预编译产生的对象, <多次执行便会产生多个独一无二的AO>
- GO-->Global Object
> 执行期保存的全局属性
```js
function a() {
  function b() {
    function c() {
    }
    c()
  }
  b()
}
a()
/**
 * a defined a.[[scope]] -->  0 : GO  
 * a doing   a.[[scope]] -->  0 : aAO   
 *                            1 : GO
 *   
 * b defined b.[[scope]] -->  0 : aAO  
 *                            1 : GO  
 * 
 * b doing   b.[[scope]] -->  0 : bAO   
 *                            1 : aAO  
 *                            2 : GO
 *   
 * c defined c.[[scope]] -->  0 : bAO   
 *                            1 : aAO  
 *                            2 : GO
 *  
 * c doing   c.[[scope]] -->  0 : cAO   
 *                            1 : bAO  
 *                            2 : aAO  
 *                            3 : GO 
 */
```
---

- 1.js
>js执行解析上下文时的流程

- 2.js
>自执行函数, 只有表达式才能别执行; 函数声明不能别执行, 可以包裹上`()/+/-/!`转换
> `(function f (){})`是立即执行, 并且`f`赋值为`undefined`
```js
(function (){})()
(function (){}())
- function (){}()

// 失去函数的定义, 下一次执行就不存在demo了
const demo = function(){}()

```

- 3.js
> 闭包, 返回的`arr`中只是单纯的函数体, 并不会直接执行当前的函数体, 终止的条件也是`10`, 返回的函数体引用的都是同一个`i/(AO)`, 导致执行时都是同一个 
---
**最常见的出发闭包的问题: 保存函数体返回到外部**
```js
arr[i] = /*函数体*/function () {
  console.log(i)
}
```
- 4.js
> call/apply

- 5.js
> JS日常小实现
- flat
- reduce
- 防抖
- 节流
- 按顺序请求一组url
- 控制并发数
- 柯理化
- 继承

- 6.js
> Promise

- 7.js
> 深克隆