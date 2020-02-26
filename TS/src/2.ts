// namespace H {
//   function showOrHide(ele: Element, attr: 'display', value: 'none' | 'block'): void;
//   function showOrHide(ele: Element, attr: 'opacity', value: number): void;
//   function showOrHide(ele: Element, attr: any, value: any) {

//   }

//   const el = document.getElementById('div');
//   el && showOrHide(el, 'display', 'block');
// }

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