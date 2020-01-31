// 抽象工厂 父类也均可使用接口 子类实现
class Icon { }
class Button { }

class AppleIcon {
  render() {
    console.log('创建一个apple图标')
  }
}
class WindowIcon {
  render() {
    console.log('创建一个apple按钮')
  }
}
class AppleButton {
  render() {
    console.log('创建一个window按钮')
  }
}
class WindowButton {
  render() {
    console.log('创建一个window按钮')
  }
}

class Factory {
  createButton() { }
  createIcon() { }
}

class AppleFactory extends Factory {
  createButton() {
    return new AppleButton()
  }
  createIcon() {
    return new AppleIcon()
  }
}

class WindowFactory extends Factory {
  createButton() {
    return new WindowButton()
  }
  createIcon() {
    return new WindowIcon()
  }
}

// 每个需求都可以创建多个平台的方法实例
const windowFactory = new WindowFactory();
windowFactory.createButton().render()