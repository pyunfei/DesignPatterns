interface IIndexService {
  log(str: string): void
}

const Types = {
  "indexService": Symbol.for('indexService')
}

class IndexService implements IIndexService {
  log(str: string) {
    console.log("🐅", str)
  }
}

function inject(serviceIdentifier: Symbol) {
  console.log("step1")
  return (target: object, targetKey: string, index: number) => {
    console.log("step2", target, targetKey, index)
    if (!targetKey) {
      // 开始劫持
      // target['indexService'] = new IndexService();
      target['w'] = 123;
      // Reflect.defineMetadata()
    }
  }
}
function controller<T extends { new(...args: any[]): {} }>(controller: T) {
  class Controller extends controller {
    // console.log("step3")
    constructor(...args: any[]) {
      super(args)
      console.log("step4")
    }
  }
  return Controller;
}

@controller
class IndexController {
  private indexService: IIndexService
  constructor(@inject(Types.indexService) indexService: IIndexService) {
    this.indexService = indexService
  }
  info() {
    this.indexService.log('🦁');
  }
}