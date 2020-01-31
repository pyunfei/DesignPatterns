//简单工厂
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
class Orange extends Plant{
  constructor(name, flavour) {
    super(name);
    this.flavour = flavour;
  }
}
class Factory {
  static create(type) {
    switch (type) {
      case 'apple':
        return new Apple('', '甜')
      case 'orange':
        return new Orange('🍊', '酸')
      default:
        throw new Error('暂无该产品！')
    }
  }
}

const apple = Factory.create('apple');
console.log(apple.flavour);
const orange = Factory.create('orange');
console.log(orange.flavour)