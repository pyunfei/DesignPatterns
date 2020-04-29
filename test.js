(async () => {
  const urls = ['hanhan/yi', 'hanhan/er'];
  for (const url of urls) {
    const { ok, body } = await fetch(url);
    ok & console.log(body)
  }
})()

function a() {
  this.money = 123;
}
a.test = 456;
function b() {
  a.call(this)
}
b.prototype = Object.create(a.prototype, {
  constructor: {
    value: a
  }
})

const nb = new b();
console.log(nb)

const s = Reflect.ownKeys(a)
const s1 = Object.values(a)
console.log(s, s1)
