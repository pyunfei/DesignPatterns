// namespace H {
//   function showOrHide(ele: Element, attr: 'display', value: 'none' | 'block'): void;
//   function showOrHide(ele: Element, attr: 'opacity', value: number): void;
//   function showOrHide(ele: Element, attr: any, value: any) {

//   }

//   const el = document.getElementById('div');
//   el && showOrHide(el, 'display', 'block');
// }

// 函数重载
namespace I {
  class User {
    constructor(public name: string) {
      this.name = name
    }

    read(title: string, content: string): void {
      console.log(`${this.name}阅读了《${title}》中的 ${content}内容`)
    }
  }

  class LaoPeng extends User {
    constructor(name: string) {
      super(name)
    }

    read(title: string, content: string): void
    read(title: string, content: string, num: number): void
    read(title: string, content: string, num?: number): void {
      super.read(title, content);
      this.writ(num!);
    }

    writ(num: number) {
      console.log(`${this.name}一共读了${num}本书`);
    }
  }
  const user = new LaoPeng('彭雲飛');
  user.read('红楼梦', '贾宝玉大战林黛玉', 99)
}

// 抽象类 实现 
namespace J {
  interface IProps {
    value: string
  }
  interface IState {
    num: string
  }
  interface Logger {
    getLogger(): string
  }
  abstract class Person<T1, T2>{
    props: T1;
    state!: T2;
    constructor(props: T1) {
      this.props = props
    }
    abstract render(): string
  }

  class LaoPeng extends Person<IProps, IState> implements Logger {
    constructor(props: IProps) {
      super(props)
      this.state = {
        num: ''
      }
    }
    render() {
      return ''
    }
    getLogger() {
      return '日志'
    }
  }

  const laopeng = new LaoPeng({ value: '老彭' })
}

// 类型系统
namespace K {
  {
    function fn(a: string | number) {
      {
        // (a as string)
        //   (<string>a)
      }
      {
        if (typeof a === 'string') {
          // ...
        }
      }
    }

    function canEach(data: any): data is Element[] | NodeList {
      return data.forEach !== undefined
    };
    function fn2(element: Element | Array<Element> | NodeList) {
      {
        if (canEach(element)) {
          // ...
        }
      }
    }
  }

  {
    const p = {
      name: '彭雲飛',
      age: 18
    }

    type P = typeof p; //简而言之就是取出所有的key
    // typeof p = p 再取出其中的key值
    function getInfo(key: keyof typeof p) {
      return p[key]
    }
  }

  {
    // 改变所有的类型值
    interface A {
      name: string,
      age: number
    }
    type AKey = keyof A;
    type newA = {
      [k in AKey]: string
    }
  }
}

// 泛型
namespace L {
  {
    function getValue<T>(obj: T, key: keyof T) {
      return obj[key]
    }
    const obj1 = { name: '彭雲飛' }
    const obj2 = { age: 18 }

    getValue<typeof obj1>(obj1, 'name')
  }

  {
    // 泛型接口
    interface IResData<T> {
      code: number,
      message: string,
      data: T
    }
    interface IResUserInfo {
      name: string,
      gender: string,
      email: string
    }
    interface IResUserCount {
      title: string,
      content: string,
      footer: string
    }

    async function getData<U>(url: string) {
      const res = await fetch(url);
      const result: Promise<IResData<U>> = await res.json();
      return result;
    }

    (async function () {
      const result1 = await getData<IResUserInfo>('/userInfo');
      const result2 = await getData<IResUserCount>('/userCount');
    })()
  }
}