namespace A {
  interface Person {
    username: string,
    password: string | number
  }

  const user1: Person = {
    username: '1',
    password: 1
  }
}

namespace B {
  enum USER_CONFIG {
    NAME = '张三',
    AGE = 18,
  }

  console.log(USER_CONFIG.NAME)
}

namespace C {
  // 扩展自定义属性
  // 由下向上下面的返回值必须是上面返回值的子类型
  interface Point {
    x: string;
    [key: string]: number | string
    // [prop: number]: number
    // [prop: string]: number
  }

  let p: Point = {
    x: '1',
  }
  p.y = 100;
}

namespace D {
  interface C {
    (x: string): string
  }

  let fn: C = function (x) {
    return x
  }
  console.log( typeof fn('1'))
}


namespace E {
  const img = document.getElementById('img');
  // (<HTMLImageElement>img).src = ''
  // (img as HTMLImageElement).src = ''
}

namespace F {
  interface iC {
    [key: string]: any
  }

  const merge = (one: iC, ...props: Array<iC>) => {
    return props.reduce((prev, next) => {
      prev = Object.assign(prev, next);
      return prev
    }, one)
  }
  console.time('merge:::')
  const result = merge({ a: 1 }, { b: 2 }, { c: 3 })
  console.timeEnd('merge:::')
  console.log(result)
}

namespace G {
  interface Num {
    a: number,
    fn: (x: number) => void
  }
  const obj: Num = {
    a: 2,
    fn(this: Num, x: number) {
      console.log(this.a)
    }
  }
  console.log(obj.fn(1))
}