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