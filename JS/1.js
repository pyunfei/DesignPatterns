// function test(){}
// console.log(test.[[scope]])

function a() {
  function b() {
    var b = 234;
  }
  var a = 123;
  b();
}
var global = 100;
a();

/** AO-->Activation Object  GO-->Global Object
 * a defined a.[[scope]] -->  0 : GO {}
 * a doing a.[[scope]] -->  0 : AO {}  1 : GO {}
 */

// test
function a() {
  function b() {
    function c() {
    }
    c()
  }
  b()
}
a()

/** AO-->Activation Object    GO-->Global Object
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
let str = 1;
if(function f(){}){
  str+= typeof f
}
console.log(str)
(function(){
  var a = b = 5
})()
console.log(b)
console.log(a)

console.log(0.14 * 100)
