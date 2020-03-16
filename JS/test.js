function test(a, b) {
  console.log(b);
  return {
    test: function (c) {
      debugger
      return test(c, a);
    }
  }
}

var a = test(100);
a.test(101);
a.test(102);
var b = test(200).test(201).test(202);
var c = test(300).test(301);
c.test(302);


var name = "window";
function Person(name) {
  this.show2 = () => console.log(this.name);
}

var personA = new Person("personA");
personA.show2();


const test = function () { console.log(234) }()
console.log(test)

var a = 3
function change1() {
  a = 4;
}
change1()
console.log(a)

var user = { age: 30 }
function change2(user) {
  user.age = 40
}
change2(user)
console.log(user.age)

function change3(user) {
  user = { age: 50 }
  console.log(user)
}
change3(user)
console.log(user.age)


Object.prototype[Symbol.iterator] = function(){
  return {
    next(){
      for(const [key ,value] of Object.entries(this)){
        console.log(key, value)
      }
      this.next()
    }
  }
}

const str = {a:1, b:2}
for (const key of str) {
  console.log(key, str[key])
}

const str = '头跟翻会🦊舞跳会🐒小树上会🐘笨大'
Array.from(str).reverse()