function Single(name) {
  this.name = name
}
Single.prototype.eat = function (food) {
  console.log(`${this.name}吃了${food}`)
}

const createSingle = (function () {
  let instance;
  return function (name) {
    if (!instance) {
      instance = new Single(name)
    }
    return instance
  }
})();

const s1 = new createSingle()
const s2 = new createSingle()
console.log(s1===s2)