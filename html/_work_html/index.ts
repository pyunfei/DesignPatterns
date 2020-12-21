const time: Date = new Date();
const time1: number = Date.now();


const n: {} = null;


{
  // 类继承类 并且实现接口
  interface One {
    run(): void;
  }
  class Public { }

  class My extends Public implements One {
    run() { }
  }
  class You implements One {
    run() { }
  }

}
{
  // 接口继承类
  class Dog {
    constructor(public x: number, public y: number) {
      this.x = x;
      this.y = y;
    }
  }
  interface smallDog extends Dog {
    z: number;
  }
  const small: smallDog = {
    x: 1, y: 2, z: 3
  }
}


{
  function a<T, U>(x: T, y: U): [T, U] {
    return [x, y]
  }

  interface Lengthwise {
    length: number;
  }
  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
  }
  // loggingIdentity(7);
}

{
  interface SearchFunc<T> {
    (n: number, value: T): Array<T>
  }
  interface Str {
    [index: number]: string
  }
  const num: SearchFunc<Str> = function <T>(n: number, value: T): Array<T> {
    const result: T[] = []
    for (let i = 0; i < n; i++) {
      result[i] = value;
    }
    return result;
  }
  num(3, 'x'); // ['x', 'x', 'x']
}


function create<T>(c: { new(): T; }): T {
  return new c();
}

