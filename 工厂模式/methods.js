// 工厂方法
class Plant {
  constructor(name) {
    this.name = name
  }
}

class Apple extends Plant {
  constructor(name, flavour) {
    super(name);
    this.flavour = flavour;
  }
}
class Orange extends Plant {
  constructor(name, flavour) {
    super(name);
    this.flavour = flavour;
  }
}

class Factory {
  create() { }
}

class AppleFactory extends Factory {
   static create() {
    return new Apple('苹果', "甜甜的")
  }
}
class OrangeFactory extends Factory {
  static create() {
   return new Orange('橘子', "酸酸的")
 }
}

const apple = AppleFactory.create()
console.log(apple.flavour)
const orange = OrangeFactory.create()
console.log(orange.flavour)
// ...