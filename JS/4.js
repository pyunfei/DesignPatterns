function test() {
  console.log('call')
}
test.call()

{
  // call
  function Person(name) {
    this.name = name
  }
  var obj = {}
  var person = new Person('fei')
  // console.log(a)
  Person.call(obj, '飞')
  console.log(obj)
}


{

  Function.prototype.call = function (target, ...args) {
    const context = target;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
  }
  Function.prototype.apply = function (target, args) {
    const context = target;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
  }

  function test(test1, test2) {
    console.log(this.a + test1 + test2)
  }
  const testObj = { a: 1 }
  test.apply(testObj, [1, 2])
}