const fs = require('fs')
// 发布订阅
const event = {
  arr: [],
  on(fn) { this.arr.push(fn) },
  emit() { this.arr.forEach(f => f()) }
}
const obj = {};
e.on(() => console.log('订阅'))
e.on(() => Object.keys(obj).length === 2, console.log('over'))

fs.readFile('', (e, d) => obj['0'] = d, e.emit())
fs.readFile('', (e, d) => obj['1'] = d, e.emit())


// 观察者
class Sub {
  constructor(name) {
    this.name = name;
    this.arr = [];
    this.status = false
  }
  attach = (target) => this.arr.push(target)
  setStatus =
    (newValue) => (this.status = newValue,
      this.arr.forEach(f => f.up(newValue)))
}

class Obe {
  constructor(name) {
    this.name = name
  }
  up(v) {
    console.log(this.name,'知道了改变成了', v)
  }
}

const s1 = new Sub('憨憨');
const o1 = new Obe('憨憨一号');
const o2 = new Obe('憨憨二号');
s1.attach(o1)
s1.attach(o2)
s1.setStatus(true)