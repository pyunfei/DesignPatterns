const Single = (function () {
  let single;
  const Single = function (name) {
    if (single) {
      return single
    } else {
      this.name = name;
      return (single = this)
    }
  }
  return Single;
})()

const s1 = new Single()
const s2 = new Single()
console.log(s1 === s2)