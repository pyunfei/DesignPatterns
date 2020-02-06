## js基础

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
>自执行函数

- 3.js
> 闭包, 返回的`arr`中只是单纯的函数体, 并不会直接执行当前的函数体, 终止的条件也是`10`, 返回的函数体引用的都是同一个`i/(AO)`, 导致执行时都是同一个 
---
**最常见的出发闭包的问题: 保存函数体返回到外部**
```js
arr[i] = /*函数体*/function () {
  console.log(i)
}
```